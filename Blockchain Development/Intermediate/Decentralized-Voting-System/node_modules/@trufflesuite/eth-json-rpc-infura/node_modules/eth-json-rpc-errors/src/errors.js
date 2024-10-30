
const { JsonRpcError, EthJsonRpcError } = require('./classes')
const { getMessageFromCode } = require('./utils')
const ERROR_CODES = require('./errorCodes.json')

module.exports = {
  /**
   * Get a JSON RPC 2.0 Parse error.
   * @param {string} [message] - A custom message.
   * @param {any} [data] - Error data.
   * @return {JsonRpcError} The error.
   */
  parse: (message, data) => getJsonRpcError(
    ERROR_CODES.jsonRpc.parse, message, data
  ),

  /**
   * Get a JSON RPC 2.0 Invalid Request error.
   * @param {string} [message] - A custom message.
   * @param {any} [data] - Error data.
   * @return {JsonRpcError} The error.
   */
  invalidRequest: (message, data) => getJsonRpcError(
    ERROR_CODES.jsonRpc.invalidRequest, message, data
  ),

  /**
   * Get a JSON RPC 2.0 Invalid Params error.
   * @param {string} [message] - A custom message.
   * @param {any} [data] - Error data.
   * @return {JsonRpcError} The error.
   */
  invalidParams: (message, data) => getJsonRpcError(
    ERROR_CODES.jsonRpc.invalidParams, message, data
  ),

  /**
   * Get a JSON RPC 2.0 Method Not Found error.
   * @param {string} [message] - A custom message.
   * @param {any} [data] - Error data.
   * @return {JsonRpcError} The error.
   */
  methodNotFound: (message, data) => getJsonRpcError(
    ERROR_CODES.jsonRpc.methodNotFound, message, data
  ),

  /**
   * Get a JSON RPC 2.0 Internal error.
   * @param {string} [message] - A custom message.
   * @param {any} [data] - Error data.
   * @return {JsonRpcError} The error.
   */
  internal: (message, data) => getJsonRpcError(
    ERROR_CODES.jsonRpc.internal, message, data
  ),

  /**
   * Get a JSON RPC 2.0 Server error.
   * Permits integer error codes in the [ -32099 <= -32000 ] range.
   * @param {number} code - The integer error code.
   * @param {string} [message] - A custom message.
   * @param {any} [data] - Error data.
   * @return {JsonRpcError} The error.
   */
  server: (code, message, data) => {
    if (!Number.isInteger(code) || code > -32000 || code < -32099) {
      throw new Error(
        '"code" must be an integer such that: -32099 <= code <= -32000'
      )
    }
    return getJsonRpcError(code, message, data)
  },
  eth: {
    /**
     * Get an Ethereum JSON RPC User Rejected Request error.
     * @param {string} [message] - A custom message.
     * @param {any} [data] - Error data.
     * @return {EthJsonRpcError} The error.
     */
    userRejectedRequest: (message, data) => {
      return getEthJsonRpcError(
        ERROR_CODES.eth.userRejectedRequest, message, data
      )
    },

    /**
     * Get an Ethereum JSON RPC Unauthorized error.
     * @param {string} [message] - A custom message.
     * @param {any} [data] - Error data.
     * @return {EthJsonRpcError} The error.
     */
    unauthorized: (message, data) => {
      return getEthJsonRpcError(
        ERROR_CODES.eth.unauthorized, message, data
      )
    },

    /**
     * Get an Ethereum JSON RPC Unsupported Method error.
     * @param {string} [message] - A custom message.
     * @param {any} [data] - Error data.
     * @return {EthJsonRpcError} The error.
     */
    unsupportedMethod: (message, data) => {
      return getEthJsonRpcError(
        ERROR_CODES.eth.unsupportedMethod, message, data
      )
    },

    /**
     * Get a custom Ethereum JSON RPC error.
     * @param {string} code - The error code.
     * @param {string} message - The error message.
     * @param {any} [data] - Error data.
     * @return {EthJsonRpcError} The error.
     */
    custom: (code, message, data) => {
      if (!message || typeof message !== 'string') throw new Error(
        '"message" must be a nonempty string'
      )
      return new EthJsonRpcError(code, message, data)
    },
  },
}

// Internal

function getJsonRpcError(code, message, data) {
  return new JsonRpcError(
    code,
    message || getMessageFromCode(code),
    data
  )
}

function getEthJsonRpcError(code, message, data) {
  return new EthJsonRpcError(
    code,
    message || getMessageFromCode(code),
    data
  )
}
