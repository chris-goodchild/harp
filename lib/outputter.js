'use strict'

const Table = require('cli-table')
const formatter = require('./formatter')

exports.createOutput = (results, complex) => {
  var output = ['\n', 'Captured network activity for:', '\n'].join('')
  output += results.pages.join('\n') + '\n'.repeat(3)
  output += createCustomDataTable(results.customData.fileTypes, complex) + '\n'
  output += createTotalsTable(results.customData.totals, results.allData) + '\n'
  console.log(output)
  return output
}

function createTable (options) {
  return new Table(Object.assign({colWidths: [30, 30, 30]}, options))
}

function createCustomDataTable (data, detailed) {
  var table = createTable({head: ['File Type', 'Download Size', 'Download Time']})

  for (let itemKey in data) {
    let item = data[itemKey]

    if (!item.bytes) continue

    table.push([itemKey.toUpperCase()].concat(getData(item.bytes, item.time)))

    if (!detailed || (detailed && !item.extensions)) continue

    for (let extKey in item.extensions) {
      let ext = item.extensions[extKey]

      if (!ext.bytes) continue

      table.push([[' '.repeat(2), extKey].join('.')].concat(getData(ext.bytes, ext.time)))
    }
  }

  return table.toString()
}

function createTotalsTable (data, all) {
  var table = createTable()

  table.push(
    {'Total Size': [formatter.formatBytes(data.bytes, 2), getPercentage(data.bytes, all.bytes)]},
    {'Total Time': [formatter.formatTime(data.time), getPercentage(data.time, all.time)]}
  )

  return table.toString()
}

function getData (bytes, time) {
  return [formatter.formatBytes(bytes, 2), formatter.formatTime(time)]
}

function getPercentage (numA, numB) {
  return formatter.formatPercentage(numA, numB) + ' of total'
}
