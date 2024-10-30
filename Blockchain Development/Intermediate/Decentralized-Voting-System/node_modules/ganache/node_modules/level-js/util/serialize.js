'use strict'

const Buffer = require('buffer').Buffer
// Returns either a Uint8Array or Buffer (doesn't matter to
// IndexedDB, because Buffer is a subclass of Uint8Array)
const str2bin = (function () {
  if (global.TextEncoder) {
    const encoder = new TextEncoder('utf-8')
    return encoder.encode.bind(encoder)
  } else {
    return Buffer.from
  }
})()

module.exports = function (data, asBuffer) {
  if (asBuffer) {
    return Buffer.isBuffer(data) ? data : str2bin(String(data))
  } else {
    return String(data)
  }
}
