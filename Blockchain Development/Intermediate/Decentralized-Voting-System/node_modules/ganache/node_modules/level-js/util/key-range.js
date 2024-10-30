/* global IDBKeyRange */

'use strict'

const ltgt = require('ltgt')
const NONE = Symbol('none')

module.exports = function createKeyRange (options) {
  const lower = ltgt.lowerBound(options, NONE)
  const upper = ltgt.upperBound(options, NONE)
  const lowerOpen = ltgt.lowerBoundExclusive(options, NONE)
  const upperOpen = ltgt.upperBoundExclusive(options, NONE)

  if (lower !== NONE && upper !== NONE) {
    return IDBKeyRange.bound(lower, upper, lowerOpen, upperOpen)
  } else if (lower !== NONE) {
    return IDBKeyRange.lowerBound(lower, lowerOpen)
  } else if (upper !== NONE) {
    return IDBKeyRange.upperBound(upper, upperOpen)
  } else {
    return null
  }
}
