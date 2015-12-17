'use strict'

const fs = require('fs')
const mkdirp = require('mkdirp')
const formatter = require('../formatter')

exports.createOutput = (results, options) => {
  var output = { pages: results.pages, customData: {}, allData: {} }
  var customData = results.customData.fileTypes

  for (let key in customData) {
    let item = customData[key]

    if (!item.bytes) continue

    output.customData[key] = { all: createResult(item) }

    if (!options.extensions || (options.extensions && !item.extensions)) continue

    output.customData[key].extensions = {}

    for (let extName in item.extensions) {
      let ext = item.extensions[extName]
      if (!ext.bytes) continue
      output.customData[key].extensions[extName] = createResult(item.extensions[extName])
    }
  }

  output.allData.size = formatter.formatBytes(results.allData.bytes, 2)
  output.allData.time = formatter.formatTime(results.allData.time)

  createFile(output)
};

function createResult (item) {
  return {
    size: formatter.formatBytes(item.bytes, 2),
    time: formatter.formatTime(item.time)
  }
}

function createFile (output) {
  var dir = process.cwd() + '/.harp/'

  mkdirp(dir, (err) => {
    if (err) return console.error('Could not create output directory!')

    fs.writeFile(dir + 'harp.json', JSON.stringify(output, null, 2), (data, err) => {
      if (err) {
        console.error('There was a problem creating .harp/harp.json', err)
      }
    })
  })
}
