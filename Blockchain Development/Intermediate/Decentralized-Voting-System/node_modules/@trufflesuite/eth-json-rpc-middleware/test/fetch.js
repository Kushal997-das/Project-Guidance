const test = require('tape')
const http = require('http')
const concat = require('concat-stream')
const series = require('async/series')
const url = require('url')
const btoa = require('btoa')
const createFetchMiddleware = require('../fetch')
const { createFetchConfigFromReq } = createFetchMiddleware

test('fetch - basic', (t) => {

  const req = {
    method: 'eth_getBlockByNumber',
    params: ['0x482103', true],
  }
  const rpcUrl = 'http://www.xyz.io/rabbit:3456'
  const { fetchUrl, fetchParams } = createFetchConfigFromReq({ req, rpcUrl })

  t.equals(fetchUrl, rpcUrl)
  t.deepEquals(fetchParams, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(req),
  })
  t.end()

})

test('fetch - origin header', (t) => {

  const req = {
    method: 'eth_getBlockByNumber',
    params: ['0x482103', true],
    origin: 'happydapp.gov',
  }
  const reqSanitized = Object.assign({}, req)
  delete reqSanitized.origin

  const rpcUrl = 'http://www.xyz.io/rabbit:3456'
  const originHttpHeaderKey = 'x-dapp-origin'
  const { fetchUrl, fetchParams } = createFetchConfigFromReq({ req, rpcUrl, originHttpHeaderKey })

  t.equals(fetchUrl, rpcUrl)
  t.deepEquals(fetchParams, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'x-dapp-origin': 'happydapp.gov',
    },
    body: JSON.stringify(reqSanitized),
  })
  t.end()

})

test('fetch - auth in url', (t) => {

  const req = {
    method: 'eth_getBlockByNumber',
    params: ['0x482103', true],
  }

  const rpcUrl = 'https://user:password@www.xyz.io:3456/rabbit'
  const normalizedUrl = 'https://www.xyz.io:3456/rabbit'
  const encodedAuth = btoa('user:password')

  const { fetchUrl, fetchParams } = createFetchConfigFromReq({ req, rpcUrl })

  t.equals(fetchUrl, normalizedUrl)
  t.deepEquals(fetchParams, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${encodedAuth}`,
    },
    body: JSON.stringify(req),
  })
  t.end()

})


test('fetch - server test', (t) => {

  const rpcUrl = 'http://localhost:3000/abc/xyz'

  const req = {
    method: 'eth_getBalance',
    params: ['0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2', 'latest'],
  }

  let rpcRes = { id: 1 }
  let server
  let serverSideRequest
  let serverSidePayload

  series([
    createServer,
    makeRequest,
    closeServer,
  ], (err) => {
    t.ifError(err, 'should not error')
    // validate request
    t.equals(serverSideRequest.headers['accept'], 'application/json')
    t.equals(serverSideRequest.headers['content-type'], 'application/json')
    t.equals(serverSideRequest.method, 'POST')
    t.equals(serverSideRequest.url, url.parse(rpcUrl).path)
    t.deepEquals(serverSidePayload, req)
    // validate response
    t.deepEquals(rpcRes, { id: 1, result: 42 })
    t.end()
  })

  function requestHandler(request, response) {
    request.pipe(concat((rawRequestBody) => {
      const payload = JSON.parse(rawRequestBody.toString())
      // save request details
      serverSideRequest = request
      serverSidePayload = payload
      // send response
      const responseBody = JSON.stringify({
        id: 1,
        result: 42,
      })
      response.end(responseBody)
    }))
  }

  function createServer(cb) {
    server = http.createServer(requestHandler)
    server.listen(3000, cb)
  }

  function closeServer(cb) {
    server.close(cb)
  }

  function makeRequest(cb) {
    const middleware = createFetchMiddleware({ rpcUrl })
    middleware(req, rpcRes, failTest, cb)
  }

  function failTest() {
    t.fail('something broke')
  }

})
