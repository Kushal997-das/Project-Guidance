const createAsyncMiddleware = require('json-rpc-engine/src/createAsyncMiddleware')
const createScaffoldMiddleware = require('json-rpc-engine/src/createScaffoldMiddleware')
const sigUtil = require('@trufflesuite/eth-sig-util')

module.exports = createWalletMiddleware

function createWalletMiddleware(opts = {}) {
  // parse + validate options
  const getAccounts = opts.getAccounts
  const processTypedMessage = opts.processTypedMessage
  const processTypedMessageV0 = opts.processTypedMessageV0
  const processTypedMessageV3 = opts.processTypedMessageV3
  const processTypedMessageV4 = opts.processTypedMessageV4
  const processPersonalMessage = opts.processPersonalMessage
  const processEthSignMessage = opts.processEthSignMessage
  const processTransaction = opts.processTransaction
  const processDecryptMessage = opts.processDecryptMessage
  const processEncryptionPublicKey = opts.processEncryptionPublicKey

  return createScaffoldMiddleware({
    // account lookups
    'eth_accounts': createAsyncMiddleware(lookupAccounts),
    'eth_coinbase': createAsyncMiddleware(lookupDefaultAccount),
    // tx signatures
    'eth_sendTransaction': createAsyncMiddleware(sendTransaction),
    // message signatures
    'eth_sign': createAsyncMiddleware(ethSign),
    'eth_signTypedData': createAsyncMiddleware(signTypedData),
    'eth_signTypedData_v0': createAsyncMiddleware(signTypedDataV0),
    'eth_signTypedData_v3': createAsyncMiddleware(signTypedDataV3),
    'eth_signTypedData_v4': createAsyncMiddleware(signTypedDataV4),
    'personal_sign': createAsyncMiddleware(personalSign),
    'eth_getEncryptionPublicKey': createAsyncMiddleware(encryptionPublicKey),
    'eth_decrypt': createAsyncMiddleware(decryptMessage),
    'personal_ecRecover': createAsyncMiddleware(personalRecover),
  })

  //
  // account lookups
  //

  async function lookupAccounts(req, res) {
    if (!getAccounts) throw new Error('WalletMiddleware - opts.getAccounts not provided')
    const accounts = await getAccounts(req)
    res.result = accounts
  }

  async function lookupDefaultAccount(req, res) {
    if (!getAccounts) throw new Error('WalletMiddleware - opts.getAccounts not provided')
    const accounts = await getAccounts(req)
    res.result = accounts[0] || null
  }

  //
  // transaction signatures
  //

  async function sendTransaction(req, res) {
    if (!processTransaction) throw new Error('WalletMiddleware - opts.processTransaction not provided')
    const txParams = req.params[0] || {}
    await validateSender(txParams.from, req)
    res.result = await processTransaction(txParams, req)
  }

  //
  // message signatures
  //

  async function ethSign(req, res) {
    if (!processEthSignMessage) throw new Error('WalletMiddleware - opts.processEthSignMessage not provided')
    // process normally
    const address = req.params[0]
    const message = req.params[1]
    // non-standard "extraParams" to be appended to our "msgParams" obj
    const extraParams = req.params[2] || {}
    const msgParams = Object.assign({}, extraParams, {
      from: address,
      data: message,
    })

    await validateSender(address, req)
    res.result = await processEthSignMessage(msgParams, req)
  }

  async function signTypedData (req, res) {
    if (!processTypedMessage) throw new Error('WalletMiddleware - opts.processTypedMessage not provided')
    const from = req.from
    const message = req.params[0]
    const address = req.params[1]
    const version = 'V1'
    const extraParams = req.params[2] || {}
    const msgParams = Object.assign({}, extraParams, {
      from: address,
      data: message,
    })

    await validateSender(address, req)
    await validateSender(from, req)
    res.result = await processTypedMessage(msgParams, req, version)
  }

  async function signTypedDataV0 (req, res) {
    if (!processTypedMessageV0) throw new Error('WalletMiddleware - opts.processTypedMessage not provided')
    const from = req.from
    const message = req.params[1]
    const address = req.params[0]
    const version = 'V0'
    await validateSender(address, req)
    await validateSender(from, req)
    const msgParams = {
      data: message,
      from: address,
      version
    }
    res.result = await processTypedMessageV0(msgParams, req, version)
  }

  async function signTypedDataV3 (req, res) {
    if (!processTypedMessageV3) throw new Error('WalletMiddleware - opts.processTypedMessage not provided')
    const from = req.from
    const message = req.params[1]
    const address = req.params[0]
    const version = 'V3'
    await validateSender(address, req)
    await validateSender(from, req)
    const msgParams = {
      data: message,
      from: address,
      version
    }
    res.result = await processTypedMessageV3(msgParams, req, version)
  }

  async function signTypedDataV4 (req, res) {
    if (!processTypedMessageV4) throw new Error('WalletMiddleware - opts.processTypedMessage not provided')
    const from = req.from
    const message = req.params[1]
    const address = req.params[0]
    const version = 'V4'
    await validateSender(address, req)
    await validateSender(from, req)
    const msgParams = {
      data: message,
      from: address,
      version
    }
    res.result = await processTypedMessageV4(msgParams, req, version)
  }

  async function personalSign (req, res) {
    if (!processPersonalMessage) throw new Error('WalletMiddleware - opts.processPersonalMessage not provided')
    // process normally
    const firstParam = req.params[0]
    const secondParam = req.params[1]
    // non-standard "extraParams" to be appended to our "msgParams" obj
    const extraParams = req.params[2] || {}

    // We initially incorrectly ordered these parameters.
    // To gracefully respect users who adopted this API early,
    // we are currently gracefully recovering from the wrong param order
    // when it is clearly identifiable.
    //
    // That means when the first param is definitely an address,
    // and the second param is definitely not, but is hex.
    let address, message
    if (resemblesAddress(firstParam) && !resemblesAddress(secondParam)) {
      let warning = `The eth_personalSign method requires params ordered `
      warning += `[message, address]. This was previously handled incorrectly, `
      warning += `and has been corrected automatically. `
      warning += `Please switch this param order for smooth behavior in the future.`
      res.warning = warning

      address = firstParam
      message = secondParam
    } else {
      message = firstParam
      address = secondParam
    }

    const msgParams = Object.assign({}, extraParams, {
      from: address,
      data: message,
    })

    await validateSender(address, req)
    res.result = await processPersonalMessage(msgParams, req)
  }

  async function personalRecover(req, res) {
    const message = req.params[0]
    const signature = req.params[1]
    // non-standard "extraParams" to be appended to our "msgParams" obj
    const extraParams = req.params[2] || {}
    const msgParams = Object.assign({}, extraParams, {
      sig: signature,
      data: message,
    })

    const senderHex = sigUtil.recoverPersonalSignature(msgParams)
    res.result = senderHex
  }

  async function encryptionPublicKey (req, res) {
    if (!processEncryptionPublicKey) throw new Error('WalletMiddleware - opts.processEncryptionPublicKey not provided')
    const address = req.params[0]

    await validateSender(address, req)
    res.result = await processEncryptionPublicKey(address, req)
  }
	
  async function decryptMessage (req, res) {
    if (!processDecryptMessage) throw new Error('WalletMiddleware - opts.processDecryptMessage not provided')
    // process normally
    const firstParam = req.params[0]
    const secondParam = req.params[1]
    // non-standard "extraParams" to be appended to our "msgParams" obj
    const extraParams = req.params[2] || {}

    const msgParams = Object.assign({}, extraParams, {
      from: secondParam,
      data: firstParam,
    })

    await validateSender(secondParam, req)
    res.result = await processDecryptMessage(msgParams, req)
  }

  //
  // utility
  //

  async function validateSender(address, req) {
    // allow unspecified address (allow transaction signer to insert default)
    if (!address) return
    // ensure address is included in provided accounts
    if (!getAccounts) throw new Error('WalletMiddleware - opts.getAccounts not provided')
    const accounts = await getAccounts(req)
    const normalizedAccounts = accounts.map(address => address.toLowerCase())
    const normalizedAddress =  address.toLowerCase()
    if (!normalizedAccounts.includes(normalizedAddress)) throw new Error('WalletMiddleware - Invalid "from" address.')
  }

}

function resemblesAddress (string) {
  // hex prefix 2 + 20 bytes
  return string.length === (2 + 20 * 2)
}
