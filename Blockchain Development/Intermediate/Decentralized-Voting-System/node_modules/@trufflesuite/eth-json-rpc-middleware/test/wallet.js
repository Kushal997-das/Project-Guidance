const test = require('tape')
const JsonRpcEngine = require('json-rpc-engine')
const BlockTracker = require('eth-block-tracker')
const EthQuery = require('ethjs-query')
const GanacheCore = require('ganache-core')
const pify = require('pify')
// const providerAsMiddleware = require('../providerAsMiddleware')
const providerFromEngine = require('../providerFromEngine')
// const createScaffoldMiddleware = require('../scaffold')
const createWalletMiddleware = require('../wallet')

const testAddresses = ['0xbe93f9bacbcffc8ee6663f2647917ed7a20a57bb', '0x1234362ef32bcd26d3dd18ca749378213625ba0b']
const testUnkownAddress = '0xbadbadbadbadbadbadbadbadbadbadbadbadbad6'
const testTxHash = '0xceb3240213640d89419829f3e8011d015af7a7ab3b54c14fdf125620ce5b8697'
const testMsgSig = '0x68dc980608bceb5f99f691e62c32caccaee05317309015e9454eba1a14c3cd4505d1dd098b8339801239c9bcaac3c4df95569dcf307108b92f68711379be14d81c'

//
// accounts
//

accountsTest({
  testLabel: 'no accounts',
  accounts: [],
})

accountsTest({
  testLabel: 'one account',
  accounts: testAddresses.slice(0, 1),
})

accountsTest({
  testLabel: 'two account',
  accounts: testAddresses.slice(0, 2),
})

//
// tx signatures
//

transactionTest({
  testLabel: 'no address',
  txParams: {
    from: undefined,
  },
  accounts: testAddresses,
  fromAddressIsValid: true,
})

transactionTest({
  testLabel: 'valid address',
  txParams: {
    from: testAddresses[0],
  },
  accounts: testAddresses,
  fromAddressIsValid: true,
})

transactionTest({
  testLabel: 'invalid address',
  txParams: {
    from: testUnkownAddress,
  },
  accounts: testAddresses,
  fromAddressIsValid: false,
})

//
// message signature
//

// eth_sign

ethSignTest({
  testLabel: 'eth_sign - no address',
  address: null,
  accounts: testAddresses.slice(),
  fromAddressIsValid: true,
})

ethSignTest({
  testLabel: 'eth_sign - valid address',
  address: testAddresses[0],
  accounts: testAddresses.slice(),
  fromAddressIsValid: true,
})

ethSignTest({
  testLabel: 'eth_sign - invalid address',
  address: testUnkownAddress,
  accounts: testAddresses.slice(),
  fromAddressIsValid: false,
})

// eth_signTypedData

ethSignTypedDataTest({
  testLabel: 'eth_signTypedData - no address',
  address: null,
  accounts: testAddresses.slice(),
  fromAddressIsValid: true,
})

ethSignTypedDataTest({
  testLabel: 'eth_signTypedData - valid address',
  address: testAddresses[0],
  accounts: testAddresses.slice(),
  fromAddressIsValid: true,
})

ethSignTypedDataTest({
  testLabel: 'eth_signTypedData - invalid address',
  address: testUnkownAddress,
  accounts: testAddresses.slice(),
  fromAddressIsValid: false,
})

// personal_sign

personalSignTest({
  testLabel: 'personal_sign - no address',
  address: null,
  accounts: testAddresses.slice(),
  fromAddressIsValid: true,
})

personalSignTest({
  testLabel: 'personal_sign - valid address',
  address: testAddresses[0],
  accounts: testAddresses.slice(),
  fromAddressIsValid: true,
})

personalSignTest({
  testLabel: 'personal_sign - invalid address',
  address: testUnkownAddress,
  accounts: testAddresses.slice(),
  fromAddressIsValid: false,
})

// personal_ecRecover

personalRecoverTest({
  testLabel: 'geth kumavis manual I recover',
  // "hello world"
  message: '0x68656c6c6f20776f726c64',
  signature: '0xce909e8ea6851bc36c007a0072d0524b07a3ff8d4e623aca4c71ca8e57250c4d0a3fc38fa8fbaaa81ead4b9f6bd03356b6f8bf18bccad167d78891636e1d69561b',
  addressHex: '0xbe93f9bacbcffc8ee6663f2647917ed7a20a57bb',
})

personalRecoverTest({
  testLabel: 'geth kumavis manual II recover',
  // message from parity's test - note result is different than what they are testing against
  // https://github.com/ethcore/parity/blob/5369a129ae276d38f3490abb18c5093b338246e0/rpc/src/v1/tests/mocked/eth.rs#L301-L317
  message: '0x0cc175b9c0f1b6a831c399e26977266192eb5ffee6ae2fec3ad71c777531578f',
  signature: '0x9ff8350cc7354b80740a3580d0e0fd4f1f02062040bc06b893d70906f8728bb5163837fd376bf77ce03b55e9bd092b32af60e86abce48f7b8d3539988ee5a9be1c',
  addressHex: '0xbe93f9bacbcffc8ee6663f2647917ed7a20a57bb',
})

// test util

function accountsTest({ testLabel, accounts }) {
  const { engine, query } = createTestSetup()

  const getAccounts = async () => accounts.slice()
  engine.push(createWalletMiddleware({ getAccounts }))

  test(testLabel, async (t) => {
    t.plan(2)

    try {
      const accountsResult = await query.accounts()
      t.deepEqual(accountsResult, accounts, 'returned all provided accounts')
      const coinbaseResult = await query.coinbase()
      if (accounts.length) {
        t.equal(coinbaseResult, accounts[0], 'returned first from provided accounts')
      } else {
        t.equal(coinbaseResult, null, 'returned null because of empty provided accounts')
      }
    } catch (err) {
      t.ifError(err)
    }
  })
}

function ethSignTest({ testLabel, address, accounts, fromAddressIsValid }) {
  const { engine, query } = createTestSetup()

  const witnessedMsgParams = []

  const getAccounts = async () => accounts.slice()
  const processEthSignMessage = async (msgParams) => {
    witnessedMsgParams.push(msgParams)
    return testMsgSig
  }
  engine.push(createWalletMiddleware({ getAccounts, processEthSignMessage }))

  test(testLabel, async (t) => {
    try {
      const message = 'haay wuurl'
      const payload = { method: 'eth_sign', params: [address, message] }
      const signMsgResponse = await pify(engine.handle).call(engine, payload)
      const signMsgResult = signMsgResponse.result
      if (fromAddressIsValid) {
        t.ok(signMsgResult, 'got result')
        t.equal(signMsgResult, testMsgSig, 'got expected msg sig')
        t.equal(witnessedMsgParams.length, 1, 'witnessed one sig request')
        const msgParams = witnessedMsgParams[0]
        t.deepEqual(msgParams, { from: address, data: message }, 'witnessed msgParams matches input')
      } else {
        t.fail('should have validated that fromAddress is invalid')
      }
    } catch (err) {
      if (!fromAddressIsValid && err.message.includes('WalletMiddleware - Invalid "from" address.')) {
        t.pass('correctly errored on invalid sender.')
      } else {
        t.ifError(err)
      }
    }
    t.end()
  })
}

function ethSignTypedDataTest({ testLabel, address, accounts, fromAddressIsValid }) {
  const { engine, query } = createTestSetup()

  const witnessedMsgParams = []

  const getAccounts = async () => accounts.slice()
  const processTypedMessage = async (msgParams) => {
    witnessedMsgParams.push(msgParams)
    return testMsgSig
  }
  engine.push(createWalletMiddleware({ getAccounts, processTypedMessage }))

  test(testLabel, async (t) => {
    try {
      const message = [
        {
          type: 'string',
          name: 'message',
          value: 'Hi, Alice!',
        },
      ]
      const payload = { method: 'eth_signTypedData', params: [message, address] }
      const signMsgResponse = await pify(engine.handle).call(engine, payload)
      const signMsgResult = signMsgResponse.result
      if (fromAddressIsValid) {
        t.ok(signMsgResult, 'got result')
        t.equal(signMsgResult, testMsgSig, 'got expected msg sig')
        t.equal(witnessedMsgParams.length, 1, 'witnessed one sig request')
        const msgParams = witnessedMsgParams[0]
        t.deepEqual(msgParams, { from: address, data: message }, 'witnessed msgParams matches input')
      } else {
        t.fail('should have validated that fromAddress is invalid')
      }
    } catch (err) {
      if (!fromAddressIsValid && err.message.includes('WalletMiddleware - Invalid "from" address.')) {
        t.pass('correctly errored on invalid sender.')
      } else {
        t.ifError(err)
      }
    }
    t.end()
  })
}

function personalSignTest({ testLabel, address, accounts, fromAddressIsValid }) {
  const { engine, query } = createTestSetup()

  const witnessedMsgParams = []

  const getAccounts = async () => accounts.slice()
  const processPersonalMessage = async (msgParams) => {
    witnessedMsgParams.push(msgParams)
    return testMsgSig
  }
  engine.push(createWalletMiddleware({ getAccounts, processPersonalMessage }))

  test(testLabel, async (t) => {
    try {
      const message = 'haay wuurl'
      const payload = { method: 'personal_sign', params: [message, address] }
      const signMsgResponse = await pify(engine.handle).call(engine, payload)
      const signMsgResult = signMsgResponse.result
      if (fromAddressIsValid) {
        t.ok(signMsgResult, 'got result')
        t.equal(signMsgResult, testMsgSig, 'got expected msg sig')
        t.equal(witnessedMsgParams.length, 1, 'witnessed one sig request')
        const msgParams = witnessedMsgParams[0]
        t.deepEqual(msgParams, { from: address, data: message }, 'witnessed msgParams matches input')
      } else {
        t.fail('should have validated that fromAddress is invalid')
      }
    } catch (err) {
      if (!fromAddressIsValid && err.message.includes('WalletMiddleware - Invalid "from" address.')) {
        t.pass('correctly errored on invalid sender.')
      } else {
        t.ifError(err)
      }
    }
    t.end()
  })
}

function transactionTest({ testLabel, txParams, accounts, fromAddressIsValid }) {
  const { engine, query } = createTestSetup()

  const witnessedTxParams = []

  const getAccounts = async () => accounts.slice()
  const processTransaction = async (txParams) => {
    witnessedTxParams.push(txParams)
    return testTxHash
  }
  engine.push(createWalletMiddleware({ getAccounts, processTransaction }))

  test(testLabel, async (t) => {
    try {
      const payload = { method: 'eth_sendTransaction', params: [txParams] }
      const sendTxResponse = await pify(engine.handle).call(engine, payload)
      const sendTxResult = sendTxResponse.result
      if (fromAddressIsValid) {
        t.ok(sendTxResult, 'got result')
        t.equal(sendTxResult, testTxHash, 'got expected tx hash')
        t.equal(witnessedTxParams.length, 1, 'witnessed one tx request')
        t.deepEqual(witnessedTxParams[0], txParams, 'witnessed txParams matches input')
      } else {
        t.fail('should have validated that fromAddress is invalid')
      }
    } catch (err) {
      if (!fromAddressIsValid && err.message.includes('WalletMiddleware - Invalid "from" address.')) {
        t.pass('correctly errored on invalid sender.')
      } else {
        t.ifError(err)
      }
    }
    t.end()
  })
}

function personalRecoverTest({ testLabel, addressHex, message, signature }) {
  const { engine, ganacheQuery } = createTestSetup()

  // setup wallet middleware
  const getAccounts = ganacheQuery.accounts.bind(ganacheQuery)
  engine.push(createWalletMiddleware({ getAccounts }))

  const payload = {
    id: 1,
    method: 'personal_ecRecover',
    params: [message, signature],
  }

  singleRpcTest({ testLabel, engine, payload, expectedResult: addressHex })
}

function singleRpcTest({ testLabel, payload, expectedResult, engine }) {
  test(testLabel, async (t) => {
    t.plan(2)

    try {
      const response = await pify(engine.handle).call(engine, payload)
      t.ok(response, 'has response')
      t.equal(response.result, expectedResult, 'rpc result is as expected')
    } catch (err) {
      t.ifError(err)
    }

    t.end()
  })
}


// util

function createTestSetup () {
  // raw data source
  const ganacheProvider = GanacheCore.provider()
  // create higher level
  const engine = new JsonRpcEngine()
  const provider = providerFromEngine(engine)
  const query = new EthQuery(provider)
  const ganacheQuery = new EthQuery(ganacheProvider)

  return { engine, provider, ganacheProvider, query, ganacheQuery }
}
