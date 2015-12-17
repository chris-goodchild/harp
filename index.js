#! /usr/bin/env node

'use strict'

const data = require('./lib/data')
const parser = require('./lib/parser')
const outputter = require('./lib/outputter')
const commandLineArgs = require('command-line-args')

const options = [
  {name: 'help', alias: 'h', type: Boolean, description: 'Display this usage guide.'},
  {name: 'src', alias: 's', type: String, description: 'The HAR JSON input file to process.'},
  {name: 'options', alias: 'o', type: String, description: 'The options JSON file to include/exclude domains.'},
  {name: 'extensions', alias: 'e', type: Boolean, description: 'Will output stats for individual file extensions.'}
]

const cli = commandLineArgs(options)

try {
  let userOptions = cli.parse()

  if (userOptions.help) {
    showHelp()
  } else {
    let results = parser.parse(data.get(userOptions.filename), userOptions)
    outputter.createOutput(results, userOptions.extensions)
  }
} catch (e) {
  console.error('\nThe option you specified is not supported!')
  showHelp()
}

function showHelp () {
  console.log(cli.getUsage(options))
}
