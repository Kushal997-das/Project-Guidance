'use strict'

const Buffer = require('buffer').Buffer
const ta2str = (function () {
  if (global.TextDecoder) {
    const decoder = new TextDecoder('utf-8')
    return decoder.decode.bind(decoder)
  } else {
    return function ta2str (ta) {
      return ta2buf(ta).toString()
    }
  }
})()

const ab2str = (function () {
  if (global.TextDecoder) {
    const decoder = new TextDecoder('utf-8')
    return decoder.decode.bind(decoder)
  } else {
    return function ab2str (ab) {
      return Buffer.from(ab).toString()
    }
  }
})()

function ta2buf (ta) {
  const buf = Buffer.from(ta.buffer)

  if (ta.byteLength === ta.buffer.byteLength) {
    return buf
  } else {
    return buf.slice(ta.byteOffset, ta.byteOffset + ta.byteLength)
  }
}

module.exports = function (data, asBuffer) {
  if (data instanceof Uint8Array) {
    return asBuffer ? ta2buf(data) : ta2str(data)
  } else if (data instanceof ArrayBuffer) {
    return asBuffer ? Buffer.from(data) : ab2str(data)
  } else {
    return asBuffer ? Buffer.from(String(data)) : String(data)
  }
}
