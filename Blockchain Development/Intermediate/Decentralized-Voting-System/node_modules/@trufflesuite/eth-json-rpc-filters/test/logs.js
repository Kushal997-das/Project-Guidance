const test = require('tape')
const LogFilter = require('../log-filter')
const testData0 = require('./data/logs0.json')
const testData1 = require('./data/logs1.json')
const testData2 = require('./data/logs2.json')
const testData3 = require('./data/logs3.json')
const testData4 = require('./data/logs4.json')
const testData5 = require('./data/logs5.json')
const testData6 = require('./data/logs6.json')

test('log filter match 0', (t) => {

  const params = testData0['eth_newFilter-req'].params[0]
  const inputLogs = testData0['eth_getLogs-res'].result

  const filter = new LogFilter({ params })
  const matchingLogs = inputLogs.filter(log => filter.matchLog(log))
  t.equal(inputLogs.length, 2, 'start with two logs')
  t.equal(matchingLogs.length, 2, 'correct number of logs matched')
  t.end()

})

test('log filter - match 1', (t) => {

  const params = testData1.params
  const inputLogs = testData1.newLogs

  const filter = new LogFilter({ params })
  const matchingLogs = inputLogs.filter(log => filter.matchLog(log))
  t.equal(inputLogs.length, 2, 'start with two logs')
  t.equal(matchingLogs.length, 0, 'correct number of logs matched')
  t.end()

})

test('log filter - match 2', (t) => {

  const params = testData2['eth_newFilter-req'].params[0]
  const inputLogs = testData2['eth_getLogs-res'].result

  const filter = new LogFilter({ params })
  const matchingLogs = inputLogs.filter(log => filter.matchLog(log))
  t.equal(inputLogs.length, 2, 'start with two logs')
  t.equal(matchingLogs.length, 1, 'correct number of logs matched')
  t.end()

})

test('log filter - match case-sensitive', (t) => {

  const params = testData3['eth_newFilter-req'].params[0]
  const inputLogs = testData3['eth_getLogs-res'].result

  const filter = new LogFilter({ params })
  const matchingLogs = inputLogs.filter(log => filter.matchLog(log))
  t.equal(inputLogs.length, 2, 'start with two logs')
  t.equal(matchingLogs.length, 2, 'correct number of logs matched')
  t.end()

})

test('log filter - "and" logic', (t) => {

  const params = testData4.filterParams
  const inputLogs = testData4.inputLogs

  const filter = new LogFilter({ params })
  const matchingLogs = inputLogs.filter(log => filter.matchLog(log))
  t.equal(inputLogs.length, 2, 'start with two logs')
  t.equal(matchingLogs.length, 1, 'correct number of logs matched')
  t.end()

})

test('log filter - "or" logic', (t) => {

  const params = testData5.filterParams
  const inputLogs = testData5.inputLogs

  const filter = new LogFilter({ params })
  const matchingLogs = inputLogs.filter(log => filter.matchLog(log))
  t.equal(inputLogs.length, 3, 'start with three logs')
  t.equal(matchingLogs.length, 2, 'correct number of logs matched')
  t.end()

})

test('log filter - "wildcard" logic', (t) => {

  const params = testData6.filterParams
  const inputLogs = testData6.inputLogs

  const filter = new LogFilter({ params })
  const matchingLogs = inputLogs.filter(log => filter.matchLog(log))
  t.equal(inputLogs.length, 3, 'start with three logs')
  t.equal(matchingLogs.length, 2, 'correct number of logs matched')
  t.end()

})
