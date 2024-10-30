/* global indexedDB */

'use strict'

module.exports = Level

const AbstractLevelDOWN = require('abstract-leveldown').AbstractLevelDOWN
const inherits = require('inherits')
const parallel = require('run-parallel-limit')
const Iterator = require('./iterator')
const serialize = require('./util/serialize')
const deserialize = require('./util/deserialize')
const support = require('./util/support')
const clear = require('./util/clear')
const createKeyRange = require('./util/key-range')

const DEFAULT_PREFIX = 'level-js-'

function Level (location, opts) {
  if (!(this instanceof Level)) return new Level(location, opts)

  AbstractLevelDOWN.call(this, {
    bufferKeys: support.bufferKeys(indexedDB),
    snapshots: true,
    permanence: true,
    clear: true,
    getMany: true
  })

  opts = opts || {}

  if (typeof location !== 'string') {
    throw new Error('constructor requires a location string argument')
  }

  this.location = location
  this.prefix = opts.prefix == null ? DEFAULT_PREFIX : opts.prefix
  this.version = parseInt(opts.version || 1, 10)
}

inherits(Level, AbstractLevelDOWN)

Level.prototype.type = 'level-js'

Level.prototype._open = function (options, callback) {
  const req = indexedDB.open(this.prefix + this.location, this.version)

  req.onerror = function () {
    callback(req.error || new Error('unknown error'))
  }

  req.onsuccess = () => {
    this.db = req.result
    callback()
  }

  req.onupgradeneeded = (ev) => {
    const db = ev.target.result

    if (!db.objectStoreNames.contains(this.location)) {
      db.createObjectStore(this.location)
    }
  }
}

Level.prototype.store = function (mode) {
  const transaction = this.db.transaction([this.location], mode)
  return transaction.objectStore(this.location)
}

Level.prototype.await = function (request, callback) {
  const transaction = request.transaction

  // Take advantage of the fact that a non-canceled request error aborts
  // the transaction. I.e. no need to listen for "request.onerror".
  transaction.onabort = function () {
    callback(transaction.error || new Error('aborted by user'))
  }

  transaction.oncomplete = function () {
    callback(null, request.result)
  }
}

Level.prototype._get = function (key, options, callback) {
  const store = this.store('readonly')
  let req

  try {
    req = store.get(key)
  } catch (err) {
    return this._nextTick(callback, err)
  }

  this.await(req, function (err, value) {
    if (err) return callback(err)

    if (value === undefined) {
      // 'NotFound' error, consistent with LevelDOWN API
      return callback(new Error('NotFound'))
    }

    callback(null, deserialize(value, options.asBuffer))
  })
}

Level.prototype._getMany = function (keys, options, callback) {
  const asBuffer = options.asBuffer
  const store = this.store('readonly')
  const tasks = keys.map((key) => (next) => {
    let request

    try {
      request = store.get(key)
    } catch (err) {
      return next(err)
    }

    request.onsuccess = () => {
      const value = request.result
      next(null, value === undefined ? value : deserialize(value, asBuffer))
    }

    request.onerror = (ev) => {
      ev.stopPropagation()
      next(request.error)
    }
  })

  parallel(tasks, 16, callback)
}

Level.prototype._del = function (key, options, callback) {
  const store = this.store('readwrite')
  let req

  try {
    req = store.delete(key)
  } catch (err) {
    return this._nextTick(callback, err)
  }

  this.await(req, callback)
}

Level.prototype._put = function (key, value, options, callback) {
  const store = this.store('readwrite')
  let req

  try {
    // Will throw a DataError or DataCloneError if the environment
    // does not support serializing the key or value respectively.
    req = store.put(value, key)
  } catch (err) {
    return this._nextTick(callback, err)
  }

  this.await(req, callback)
}

Level.prototype._serializeKey = function (key) {
  return serialize(key, this.supports.bufferKeys)
}

Level.prototype._serializeValue = function (value) {
  return serialize(value, true)
}

Level.prototype._iterator = function (options) {
  return new Iterator(this, this.location, options)
}

Level.prototype._batch = function (operations, options, callback) {
  if (operations.length === 0) return this._nextTick(callback)

  const store = this.store('readwrite')
  const transaction = store.transaction
  let index = 0
  let error

  transaction.onabort = function () {
    callback(error || transaction.error || new Error('aborted by user'))
  }

  transaction.oncomplete = function () {
    callback()
  }

  // Wait for a request to complete before making the next, saving CPU.
  function loop () {
    const op = operations[index++]
    const key = op.key

    let req

    try {
      req = op.type === 'del' ? store.delete(key) : store.put(op.value, key)
    } catch (err) {
      error = err
      transaction.abort()
      return
    }

    if (index < operations.length) {
      req.onsuccess = loop
    }
  }

  loop()
}

Level.prototype._clear = function (options, callback) {
  let keyRange
  let req

  try {
    keyRange = createKeyRange(options)
  } catch (e) {
    // The lower key is greater than the upper key.
    // IndexedDB throws an error, but we'll just do nothing.
    return this._nextTick(callback)
  }

  if (options.limit >= 0) {
    // IDBObjectStore#delete(range) doesn't have such an option.
    // Fall back to cursor-based implementation.
    return clear(this, this.location, keyRange, options, callback)
  }

  try {
    const store = this.store('readwrite')
    req = keyRange ? store.delete(keyRange) : store.clear()
  } catch (err) {
    return this._nextTick(callback, err)
  }

  this.await(req, callback)
}

Level.prototype._close = function (callback) {
  this.db.close()
  this._nextTick(callback)
}

// NOTE: remove in a next major release
Level.prototype.upgrade = function (callback) {
  if (this.status !== 'open') {
    return this._nextTick(callback, new Error('cannot upgrade() before open()'))
  }

  const it = this.iterator()
  const batchOptions = {}
  const self = this

  it._deserializeKey = it._deserializeValue = identity
  next()

  function next (err) {
    if (err) return finish(err)
    it.next(each)
  }

  function each (err, key, value) {
    if (err || key === undefined) {
      return finish(err)
    }

    const newKey = self._serializeKey(deserialize(key, true))
    const newValue = self._serializeValue(deserialize(value, true))

    // To bypass serialization on the old key, use _batch() instead of batch().
    // NOTE: if we disable snapshotting (#86) this could lead to a loop of
    // inserting and then iterating those same entries, because the new keys
    // possibly sort after the old keys.
    self._batch([
      { type: 'del', key: key },
      { type: 'put', key: newKey, value: newValue }
    ], batchOptions, next)
  }

  function finish (err) {
    it.end(function (err2) {
      callback(err || err2)
    })
  }

  function identity (data) {
    return data
  }
}

Level.destroy = function (location, prefix, callback) {
  if (typeof prefix === 'function') {
    callback = prefix
    prefix = DEFAULT_PREFIX
  }
  const request = indexedDB.deleteDatabase(prefix + location)
  request.onsuccess = function () {
    callback()
  }
  request.onerror = function (err) {
    callback(err)
  }
}
