const EventEmitter = require('events')
const EthBlockTracker = require('eth-block-tracker')
const EthQuery = require('ethjs-query')
const JsonRpcEngine = require('json-rpc-engine')
const providerAsMiddleware = require('@trufflesuite/eth-json-rpc-middleware/providerAsMiddleware')
const providerFromEngine = require('@trufflesuite/eth-json-rpc-middleware/providerFromEngine')
const GanacheCore = require('ganache-core')
const pify = require('pify')
const createFilterMiddleware = require('../index.js')
const createSubscriptionMiddleware = require('../subscriptionManager.js')

module.exports = {
  createPayload,
  createEngineFromGanacheCore,
  createEngineFromTestBlockMiddleware,
  createTestSetup,
  asyncTest,
  timeout,
  deployLogEchoContract,
}

function createTestSetup () {
  // raw data source
  const { ganacheProvider, forceNextBlock } = createEngineFromGanacheCore()
  // create block trackerfilterId
  const blockTracker = new EthBlockTracker({
    provider: ganacheProvider,
    pollingInterval: 200,
  })
  // create higher level
  const engine = new JsonRpcEngine()
  const provider = providerFromEngine(engine)
  const query = new EthQuery(provider)
  // add filter middleware
  engine.push(createFilterMiddleware({ blockTracker, provider }))
  // add subscription middleware
  const subscriptionManager = createSubscriptionMiddleware({ blockTracker, provider })
  engine.push(subscriptionManager.middleware)
  subscriptionManager.events.on('notification', (message) => engine.emit('notification', message))
  // add data source
  engine.push(providerAsMiddleware(ganacheProvider))

  // subs helper
  const subs = createSubsHelper({ provider })

  return { ganacheProvider, forceNextBlock, engine, provider, query, subs, blockTracker, trackNextBlock }

  async function trackNextBlock() {
    return new Promise((resolve) => blockTracker.once('latest', resolve))
  }
}

function createSubsHelper({ provider }) {
  return {
    logs: createSubGenerator({ subType: 'logs', provider }),
    newPendingTransactions: createSubGenerator({ subType: 'newPendingTransactions', provider }),
    newHeads: createSubGenerator({ subType: 'newHeads', provider }),
  }
}

function createSubGenerator({ subType, provider }) {
  return pify(function() {
    const args = [].slice.call(arguments)
    const cb = args.pop()
    args.unshift(subType)
    provider.sendAsync({ method: 'eth_subscribe', params: args }, (err, res) => {
      if (err) return cb(err)
      const id = res.result
      const result = createNewSub({ id, provider })
      cb(null, result)
    })
  })
}

function createNewSub({ id, provider }) {
  // event emitter for emiting subscription hits
  const events = new EventEmitter()
  // filter rpc notifications for matching subscription
  provider.on('data', (_, message) => {
    if (message.method !== 'eth_subscription') return
    const subId = message.params.subscription
    if (subId !== id) return
    const value = message.params.result
    events.emit('notification', value)
  })
  // subscription uninstall method
  function uninstall(cb) {
    provider.sendAsync({ method: 'eth_unsubscribe', params: [id] }, (err, res) => {
      if (err) return cb(err)
      cb(null, res.result)
    })
  }
  // return custom "subscription" api object
  return {
    id,
    events,
    uninstall: pify(uninstall),
  }
}

function createEngineFromGanacheCore () {
  const ganacheProvider = GanacheCore.provider()
  return { ganacheProvider, forceNextBlock }

  async function forceNextBlock() {
    // custom ganache-core method
    await pify(ganacheProvider.sendAsync).call(ganacheProvider, createPayload({ method: 'evm_mine' }))
  }
}

function createEngineFromTestBlockMiddleware () {
  const engine = new JsonRpcEngine()
  const testBlockSource = new TestBlockMiddleware()
  engine.push(testBlockSource.createMiddleware())
  return { engine, testBlockSource }
}

function createPayload(payload) {
  return Object.assign({ id: 1, jsonrpc: '2.0', params: [] }, payload)
}

function asyncTest(asyncTestFn){
  return async function(t) {
    try {
      await asyncTestFn(t)
      t.end()
    } catch (err) {
      t.end(err)
    }
  }
}

function timeout(duration) {
  return new Promise(resolve => setTimeout(resolve, duration))
}


async function deployLogEchoContract({ tools, from }){
  // https://github.com/kumavis/eth-needlepoint/blob/master/examples/emit-log.js
  const eth = tools.query
  const deployTxHash = await eth.sendTransaction({ from, data: '0x600e600c600039600e6000f336600060003760005160206000a1' })
  await tools.trackNextBlock()
  const deployTxRx = await eth.getTransactionReceipt(deployTxHash)
  const contractAddress = deployTxRx.contractAddress
  return {
    deployTxHash,
    deployTxRx,
    contractAddress,
  }
}
