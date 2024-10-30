
const test = require('tape')
const dequal = require('fast-deep-equal')

const { errors: rpcErrors, serializeError, ERROR_CODES } = require('../')
const getMessageFromCode = require('../src/utils').getMessageFromCode

const jsonRpcCodes = ERROR_CODES.jsonRpc

const dummyData = { foo: 'bar' }
const dummyMessage = 'baz'

const invalidError0 = 0
const invalidError1 = ['foo', 'bar', 3]
const invalidError2 = { code: 34 }
const invalidError3 = { code: 4001 }
const invalidError4 = { code: 4001, message: 3, data: { ...dummyData } }
const invalidError5 = null
const invalidError6 = undefined
const invalidError7 = { code: 34, message: dummyMessage , data: { ...dummyData } }

const validError0 = { code: 4001, message: dummyMessage }
const validError1 = { code: 4001, message: dummyMessage, data: { ...dummyData } }
const validError2 = rpcErrors.parse()
const validError3 = rpcErrors.parse(dummyMessage, { ...dummyData })

test('invalid error: non-object', t => {
  const result = serializeError(invalidError0)
  t.ok(
    dequal(
      result,
      {
        code: jsonRpcCodes.internal,
        message: getMessageFromCode(jsonRpcCodes.internal),
        data: { originalError: invalidError0 }
      }
    ),
    'serialized error matches expected result'
  )
  t.end()
})

test('invalid error: null', t => {
  const result = serializeError(invalidError5)
  t.ok(
    dequal(
      result,
      {
        code: jsonRpcCodes.internal,
        message: getMessageFromCode(jsonRpcCodes.internal),
        data: { originalError: invalidError5 }
      }
    ),
    'serialized error matches expected result'
  )
  t.end()
})

test('invalid error: undefined', t => {
  const result = serializeError(invalidError6)
  t.ok(
    dequal(
      result,
      {
        code: jsonRpcCodes.internal,
        message: getMessageFromCode(jsonRpcCodes.internal),
        data: { originalError: invalidError6 }
      }
    ),
    'serialized error matches expected result'
  )
  t.end()
})

test('invalid error: array', t => {
  const result = serializeError(invalidError1)
  t.ok(
    dequal(
      result,
      {
        code: jsonRpcCodes.internal,
        message: getMessageFromCode(jsonRpcCodes.internal),
        data: { originalError: invalidError1 }
      }
    ),
    'serialized error matches expected result'
  )
  t.end()
})

test('invalid error: invalid code', t => {
  const result = serializeError(invalidError2)
  t.ok(
    dequal(
      result,
      {
        code: jsonRpcCodes.internal,
        message: getMessageFromCode(jsonRpcCodes.internal),
        data: { originalError: { ...invalidError2 } }
      }
    ),
    'serialized error matches expected result'
  )
  t.end()
})

test('invalid error: valid code, undefined message', t => {
  const result = serializeError(invalidError3)
  t.ok(
    dequal(
      result,
      {
        code: 4001,
        message: getMessageFromCode(4001),
        data: { originalError: { ...invalidError3 } }
      }
    ),
    'serialized error matches expected result'
  )
  t.end()
})

test('invalid error: non-string message with data', t => {
  const result = serializeError(invalidError4)
  t.ok(
    dequal(
      result,
      {
        code: 4001,
        message: getMessageFromCode(4001),
        data: { originalError: { ...invalidError4 } }
      }
    ),
    'serialized error matches expected result'
  )
  t.end()
})

test('invalid error: invalid code with string message', t => {
  const result = serializeError(invalidError7)
  t.ok(
    dequal(
      result,
      {
        code: jsonRpcCodes.internal,
        message: dummyMessage,
        data: { originalError: { ...invalidError7 } }
      }
    ),
    'serialized error matches expected result'
  )
  t.end()
})

test('valid error: code and message only', t => {
  const result = serializeError(validError0)
  t.ok(
    dequal(
      result,
      {
        code: 4001,
        message: validError0.message,
      }
    ),
    'serialized error matches expected result'
  )
  t.end()
})

test('valid error: code, message, and data', t => {
  const result = serializeError(validError1)
  t.ok(
    dequal(
      result,
      {
        code: 4001,
        message: validError1.message,
        data: { ...validError1.data },
      }
    ),
    'serialized error matches expected result'
  )
  t.end()
})

test('valid error: instantiated error', t => {
  const result = serializeError(validError2)
  t.ok(
    dequal(
      result,
      {
        code: jsonRpcCodes.parse,
        message: getMessageFromCode(jsonRpcCodes.parse),
        stack: validError2.stack,
      }
    ),
    'serialized error matches expected result'
  )
  t.end()
})

test('valid error: instantiated error with custom message and data', t => {
  const result = serializeError(validError3)
  t.ok(
    dequal(
      result,
      {
        code: jsonRpcCodes.parse,
        message: validError3.message,
        data: { ...validError3.data },
        stack: validError3.stack,
      }
    ),
    'serialized error matches expected result'
  )
  t.end()
})
