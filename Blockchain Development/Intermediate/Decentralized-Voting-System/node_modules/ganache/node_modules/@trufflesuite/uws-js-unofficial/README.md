## :construction: This is a fork!

This is a fork of the original [uWebSockets.js](https://github.com/uNetworking/uWebSockets.js) by @alexhultman. This fork adds unofficial support for Electron builds (Electron version 8, 9, 10, 11, and 12) by changing the build pipeline to use `node-gyp` instead of a custom C++ build script which allows us to use [electron-rebuild](https://github.com/electron/electron-rebuild) as well as introducing a Typescript fallback for nodejs runtimes and architectures not supported by the included binaries. This repo is mainly for internal use to support Truffle Suite's [Ganache UI](https://github.com/trufflesuite/ganache) Electron application.

**NOTE**: These binaries **do not** support SSL or Compression. They were not necessary for our uses, and we had issues getting those to compile with the Electron headers.

<div align="center">
<img src="https://raw.githubusercontent.com/uNetworking/uWebSockets/master/misc/logo.svg" height="180" /><br>
<i>Simple, secure</i><sup><a href="https://github.com/uNetworking/uWebSockets/tree/master/fuzzing#fuzz-testing-of-various-parsers-and-mocked-examples">1</a></sup><i> & standards compliant</i><sup><a href="https://unetworking.github.io/uWebSockets.js/report.pdf">2</a></sup><i> web server for the most demanding</i><sup><a href="https://github.com/uNetworking/uWebSockets/tree/master/benchmarks#benchmark-driven-development">3</a></sup><i> of applications.</i> <a href="https://github.com/uNetworking/uWebSockets#readme">Read more...</a>
<br><br>

<a href="https://github.com/uNetworking/uWebSockets.js/releases"><img src="https://img.shields.io/github/v/release/uNetworking/uWebSockets.js"></a> <a href="https://bugs.chromium.org/p/oss-fuzz/issues/list?sort=-opened&can=1&q=proj:uwebsockets"><img src="https://oss-fuzz-build-logs.storage.googleapis.com/badges/uwebsockets.svg" /></a> <img src="https://img.shields.io/badge/downloads-70%20million-green" /> <img src="https://img.shields.io/badge/established-in%202016-green" />
</div>
<br><br>

### :zap: Simple performance
µWebSockets.js is a web server bypass for Node.js that reimplements eventing, networking, encryption, web protocols, routing and pub/sub in highly optimized C++. As such, µWebSockets.js delivers web serving for Node.js, **[8.5x that of Fastify](https://alexhultman.medium.com/serving-100k-requests-second-from-a-fanless-raspberry-pi-4-over-ethernet-fdd2c2e05a1e)** and at least **[10x that of Socket.IO](https://medium.com/swlh/100k-secure-websockets-with-raspberry-pi-4-1ba5d2127a23)**. It is also the built-in **[web server of Bun](https://bun.sh/)**.

* We *recommend, for simplicity* installing with `bun install uNetworking/uWebSockets.js#v20.27.0` or any such [release](https://github.com/uNetworking/uWebSockets.js/releases). Use [official builds](https://nodejs.org/en/download) of Node.js LTS.

* Browse the [documentation](https://unetworking.github.io/uWebSockets.js/generated/) and see the [main repo](https://github.com/uNetworking/uWebSockets). There are tons of [examples](examples) but here's the gist of it all:

```javascript
/* Non-SSL is simply App() */
require('uWebSockets.js').SSLApp({

  /* There are more SSL options, cut for brevity */
  key_file_name: 'misc/key.pem',
  cert_file_name: 'misc/cert.pem',

}).ws('/*', {

  /* There are many common helper features */
  idleTimeout: 32,
  maxBackpressure: 1024,
  maxPayloadLength: 512,
  compression: DEDICATED_COMPRESSOR_3KB,

  /* For brevity we skip the other events (upgrade, open, ping, pong, close) */
  message: (ws, message, isBinary) => {
    /* You can do app.publish('sensors/home/temperature', '22C') kind of pub/sub as well */

    /* Here we echo the message back, using compression if available */
    let ok = ws.send(message, isBinary, true);
  }

}).get('/*', (res, req) => {

  /* It does Http as well */
  res.writeStatus('200 OK').writeHeader('IsExample', 'Yes').end('Hello there!');

}).listen(9001, (listenSocket) => {

  if (listenSocket) {
    console.log('Listening to port 9001');
  }

});
```

### :handshake: Permissively licensed by uNetworking AB
Intellectual property and all rights reserved by [uNetworking](https://github.com/uNetworking/). The [license](./LICENSE) in this repository is the one kept from the [original repository](https://github.com/uNetworking/uWebSockets.js).

Where such explicit notice is given, source code is licensed Apache License 2.0 which is a permissive OSI-approved license with very few limitations. Modified "forks" should be of nothing but licensed source code, and be made available under another product name. If you're uncertain about any of this, please ask before assuming.

## Creating a release

This is an internal fork used primarily in [Ganache](https://github.com/trufflesuite/ganache). There are no tests (might be a good idea to add some!) so testing must be done via [Ganache](https://github.com/trufflesuite/ganache) and/or manually.

### Update the version

The `npm build` script attempts to build the native binaries (but will fail unless the [git submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules) are checked out - see `.gitmodules` which defines the submodule `uWebSockets` which points to the [uNetworking/uWebSockets](https://github.com/uNetworking/uWebSockets) native project). This is not necessary for packaging a release. The GitHub action `aggregate_binaries` will checkout the submodules, build the binaries and commit them to `/binaries` which are then included in the npm package.

This will update the version of the package, and create commit these changes to git.

First, find the current version of the package:

    npm view . version
    > 20.4.0-unofficial.4

For local changes only, you will only want to increment the pre-release identifier (as the [version core](https://semver.org/#backusnaur-form-grammar-for-valid-semver-versions) tracks the upstream uWebSockets version), by using [npm-version](https://docs.npmjs.com/cli/v8/commands/npm-version) (this will commit the changes, tagged with the commit - remember to push this!) ie:

    npm version 20.4.0-unofficial.5 --git-tag-version false
    > v20.4.0-unofficial.5

### Build the package

Create the package using [npm-pack](https://docs.npmjs.com/cli/v7/commands/npm-pack), which will build the project, and output `trufflesuite-uws-js-unofficial-<version>.tgz`. There will likely be a number of `clang: error:`s ouput, which you can safely ignore.

This file `trufflesuite-uws-js-unofficial-<version>.tgz` is what will be published to npm, and will be served to clients from npm via `npm install`.

### Test the package in Ganache

This can be installed directly to a local nodejs project via `npm install <path-to-trufflesuite-uws-js-unofficial-<version>.tgz>`. In order to test the package within Ganache, `@trufflesuite/uws-js-unofficial` will need to be installed into a number of sub-packages:

- src/ethereum/ethereum
- src/core
- src/utils

Navigate to each of the following package roots (found by searching for `package.json` files containing `@trufflesuite/uws-js-unofficial`), and install the local `@trufflesuite/uws-js-unofficial` package directly:

     npm install <path-to-trufflesuite-uws-js-unofficial-[version].tgz>

Run the Ganache test suite (this will exercise both the native uWS, and Typescript fallback versions) from the root of the Ganache repository:

     npm run test

Note: if testing externally to Ganache, the Typescript fallback can be forced by setting the `UWS_USE_FALLBACK` environment variable to `true`.

### Publish the updated package

Run [npm-publish](https://docs.npmjs.com/cli/v8/commands/npm-publish) to publish the package to npm (you will need to be authenticated with a user who has appropriate permissions to publish the package - see [npm-adduser](https://docs.npmjs.com/cli/v7/commands/npm-adduser)):

     npm publish <path-to-trufflesuite-uws-js-unofficial-[version].tgz>