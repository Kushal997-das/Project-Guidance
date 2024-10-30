const test = require('tape')
const JsonRpcEngine = require('json-rpc-engine')
const BlockTracker = require('eth-block-tracker')
const EthQuery = require('eth-query')
const GanacheCore = require('ganache-core')
const pify = require('pify')
const createBlockCacheMiddleware = require('../block-cache')
const providerFromEngine = require('../providerFromEngine')
const providerAsMiddleware = require('../providerAsMiddleware')
const createHitTrackerMiddleware = require('./util/createHitTrackerMiddleware')

//
// basic cache
//

// block tags

cacheTest('getBalance + undefined blockTag', {
  method: 'eth_getBalance',
  params: ['0x1234'],
}, true)

cacheTest('getBalance + latest blockTag', {
  method: 'eth_getBalance',
  params: ['0x1234', 'latest'],
}, true)

cacheTest('getBalance + pending blockTag', {
  method: 'eth_getBalance',
  params: ['0x1234', 'pending'],
}, false)

// blocks

// cache hit, because latest block is #0
cacheTest('getBlockForNumber for latest then block 0', [{
  method: 'eth_getBlockByNumber',
  params: ['latest'],
}, {
  method: 'eth_getBlockByNumber',
  params: ['0x0'],
}], true)

cacheTest('getBlockForNumber for latest then block 1', [{
  method: 'eth_getBlockByNumber',
  params: ['latest'],
}, {
  method: 'eth_getBlockByNumber',
  params: ['0x1'],
}], false)

cacheTest('getBlockForNumber for 0 then block 1', [{
  method: 'eth_getBlockByNumber',
  params: ['0x0'],
}, {
  method: 'eth_getBlockByNumber',
  params: ['0x1'],
}], false)

cacheTest('getBlockForNumber for block 0', [{
  method: 'eth_getBlockByNumber',
  params: ['0x0'],
}, {
  method: 'eth_getBlockByNumber',
  params: ['0x0'],
}], true)

cacheTest('getBlockForNumber for block 1', [{
  method: 'eth_getBlockByNumber',
  params: ['0x1'],
}, {
  method: 'eth_getBlockByNumber',
  params: ['0x1'],
}], true)

// storage

cacheTest('getStorageAt for same block should cache', [{
  method: 'eth_getStorageAt',
  params: ['0x295a70b2de5e3953354a6a8344e616ed314d7251', '0x0', '0x1234'],
}, {
  method: 'eth_getStorageAt',
  params: ['0x295a70b2de5e3953354a6a8344e616ed314d7251', '0x0', '0x1234'],
}], true)

cacheTest('getStorageAt for different block should not cache', [{
  method: 'eth_getStorageAt',
  params: ['0x295a70b2de5e3953354a6a8344e616ed314d7251', '0x0', '0x1234'],
}, {
  method: 'eth_getStorageAt',
  params: ['0x295a70b2de5e3953354a6a8344e616ed314d7251', '0x0', '0x4321'],
}], false)

//
// result conditional cache
//

// these tests were imported from provider-engine but rely on state setup we dont have here yet

// // tx by hash

// cacheTest('getTransactionByHash for transaction that doesn\'t exist', {
//   method: 'eth_getTransactionByHash',
//   params: ['0x00000000000000000000000000000000000000000000000000deadbeefcafe00'],
// }, false)

// cacheTest('getTransactionByHash for transaction that\'s pending', {
//   method: 'eth_getTransactionByHash',
//   params: ['0x00000000000000000000000000000000000000000000000000deadbeefcafe01'],
// }, false)

// cacheTest('getTransactionByHash for mined transaction', {
//   method: 'eth_getTransactionByHash',
//   params: ['0x00000000000000000000000000000000000000000000000000deadbeefcafe02'],
// }, true)

// // code

// cacheTest('getCode for latest block, then for earliest block, should not return cached response on second request', [{
//   method: 'eth_getCode',
//   params: ['0x1234', 'latest'],
// }, {
//   method: 'eth_getCode',
//   params: ['0x1234', 'earliest'],
// }], false)

// cacheTest('getCode for a specific block, then for the one before it, should not return cached response on second request', [{
//   method: 'eth_getCode',
//   params: ['0x1234', '0x3'],
// }, {
//   method: 'eth_getCode',
//   params: ['0x1234', '0x2'],
// }], false)

// cacheTest('getCode for a specific block, then the one after it, should return cached response on second request', [{
//   method: 'eth_getCode',
//   params: ['0x1234', '0x2'],
// }, {
//   method: 'eth_getCode',
//   params: ['0x1234', '0x3'],
// }], true)

// cacheTest('getCode for an unspecified block, then for the latest, should return cached response on second request', [{
//   method: 'eth_getCode',
//   params: ['0x1234'],
// }, {
//   method: 'eth_getCode',
//   params: ['0x1234', 'latest'],
// }], true)



async function cacheTest(label, basePayloads, shouldCache) {
  test(`block-cache - ${label}`, async (t) => {
    try {
      // setup block tracker
      const dataProvider = GanacheCore.provider()
      const blockTracker = new BlockTracker({
        provider: dataProvider,
        pollingInterval: 200,
      })

      // setup engine
      const engine = new JsonRpcEngine()
      engine.push(createBlockCacheMiddleware({ blockTracker }))
      const hitCountMiddleware = createHitTrackerMiddleware()
      engine.push(hitCountMiddleware)
      const dummyResultMiddleware = (req, res, next, end) => {
        res.result = true
        end()
      }
      engine.push(dummyResultMiddleware)

      // prepare payloads
      const payload1 = Object.assign({}, (Array.isArray(basePayloads) ? basePayloads[0] : basePayloads), { id: 1, jsonrpc: '2.0' })
      const payload2 = Object.assign({}, (Array.isArray(basePayloads) ? basePayloads[1] : basePayloads), { id: 2, jsonrpc: '2.0' })

      // perform tests
      // first try, cache miss
      const res1 = await pify(engine.handle).call(engine, payload1)
      t.ifError(res1.error, `${label} - res1 should not have error`)
      t.ok(res1.result !== undefined, `${label} - res1 should have result`)
      t.equal(hitCountMiddleware.getHits(payload1.method).length, 1, `${label} - should hit dataProvider`)
      // second try, cache miss
      const res2 = await pify(engine.handle).call(engine, payload2)
      t.ifError(res2.error, `${label} - res2 should not have error`)
      t.ok(res2.result !== undefined, `${label} - res2 should have result`)
      if (shouldCache) {
        t.equal(hitCountMiddleware.getHits(payload2.method).length, 1, `${label} - should NOT hit dataProvider`)
      } else {
        t.equal(hitCountMiddleware.getHits(payload2.method).length, 2, `${label} - should again hit dataProvider`)
      }
    } catch (err) {
      t.fail(err)
    }
    t.end()
  })
}
