const test = require('tape')
const JsonRpcEngine = require('json-rpc-engine')
const BlockTracker = require('eth-block-tracker')
const GanacheCore = require('ganache-core')
const pify = require('pify')
const EthQuery = require('ethjs-query')
const createBlockRefMiddleware = require('../block-ref')
const ScaffoldMiddleware = require('../scaffold')
const providerFromEngine = require('../providerFromEngine')
const providerAsMiddleware = require('../providerAsMiddleware')
const createHitTrackerMiddleware = require('./util/createHitTrackerMiddleware')

test('contructor - no opts', (t) => {
  t.plan(1)

  t.throws(() => {
    createBlockRefMiddleware()
  }, Error, 'Constructor without options fails')
  t.end()
})

test('contructor - empty opts', (t) => {
  t.plan(1)

  t.throws(() => {
    createBlockRefMiddleware({})
  }, Error, 'Constructor without empty options')
  t.end()
})

// test('provider not ready - shouldnt hang non-"latest" requests', async (t) => {
//   t.plan(3)
//   const { engine } = createTestSetup()
//
//   try {
//     const res = await pify(engine.handle).call(engine, { id: 1, method: 'net_listening', params: [] })
//     console.log(res)
//     t.ok(res, 'Has response')
//     t.equal(res.result, true, 'Response result is correct.')
//   } catch (err) {
//     t.ifError(err, 'No error in response')
//   }
//   t.end()
// })

test('should rewrite "latest" blockRef to current block', async (t) => {
  t.plan(4)
  const { engine, query, hitTracker } = createTestSetup()

  try {
    const accounts = await query.accounts()
    t.ok(accounts.length > 0, 'Should have accounts')
    const origReq = { id: 1, method: 'eth_getBalance', params: [accounts[0], 'latest'] }
    const res = await pify(engine.handle).call(engine, origReq)
    t.equal(origReq.params[1], 'latest', 'Original request unchanged')
    const matchingHit = hitTracker.getHits(origReq.method)[0]
    t.equal(matchingHit.params[1], '0x0', 'Original request params rewritten internally')
    t.ok(res, 'Has response')
  } catch (err) {
    t.ifError(err, 'Should not encounter error')
  }
  t.end()
})

test('should add blockRef for omitted blockRef param', async (t) => {
  t.plan(5)
  const { engine, query, hitTracker } = createTestSetup()

  try {
    const accounts = await query.accounts()
    t.ok(accounts.length > 0, 'Should have accounts')
    const origReq = { id: 1, method: 'eth_getBalance', params: [accounts[0]] }
    const res = await pify(engine.handle).call(engine, origReq)
    t.equal(origReq.params[1], undefined, 'Original request unchanged')
    t.equal(origReq.params.length, 1, 'Original request unchanged')
    const matchingHit = hitTracker.getHits(origReq.method)[0]
    t.equal(matchingHit.params[1], '0x0', 'Original request params rewritten internally')
    t.ok(res, 'Has response')
  } catch (err) {
    t.ifError(err, 'Should not encounter error')
  }
  t.end()
})

// util

function createTestSetup () {
  // raw data source
  const dataProvider = GanacheCore.provider()
  // create block tracker
  const blockTracker = new BlockTracker({
    provider: dataProvider,
    pollingInterval: 100,
  })
  // create higher level
  const engine = new JsonRpcEngine()
  const provider = providerFromEngine(engine)
  // add block ref middleware
  engine.push(createBlockRefMiddleware({ provider, blockTracker }))
  // hit tracker
  const hitTracker = createHitTrackerMiddleware()
  engine.push(hitTracker)
  // add data source
  engine.push(providerAsMiddleware(dataProvider))
  const query = new EthQuery(provider)
  return { engine, provider, dataProvider, query, blockTracker, hitTracker }
}
