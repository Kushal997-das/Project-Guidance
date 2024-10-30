
const { JsonRpcError, EthJsonRpcError } = require('./src/classes')
const {
  serializeError, getMessageFromCode,
} = require('./src/utils')
const errors = require('./src/errors')
const ERROR_CODES = require('./src/errorCodes.json')

module.exports = {
  errors,
  JsonRpcError,
  EthJsonRpcError,
  serializeError,
  getMessageFromCode,
  /** @type ErrorCodes */
  ERROR_CODES,
}

// Types

/**
 * @typedef {Object} EthJsonRpcErrorCodes
 * @property {number} userRejectedRequest
 * @property {number} unauthorized
 * @property {number} unsupportedMethod
 */

/**
 * @typedef {Object} JsonRpcErrorCodes
 * @property {number} parse
 * @property {number} invalidRequest
 * @property {number} invalidParams
 * @property {number} methodNotFound
 * @property {number} internal
 */

/**
 * @typedef ErrorCodes
 * @property {JsonRpcErrorCodes} jsonRpc
 * @property {EthJsonRpcErrorCodes} eth
 */
