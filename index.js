#! /usr/bin/env node

'use strict'

const data = require('./lib/data')
const parser = require('./lib/parser')
const outputTypes = require('./lib/outputTypes')
const commandLineArgs = require('command-line-args')

const options = [
  {name: 'help', alias: 'h', type: Boolean, description: 'Display this usage guide.'},
  {name: 'src', alias: 's', type: String, description: 'The HAR JSON input file to process.'},
  {name: 'options', alias: 'o', type: String, description: 'The options JSON file to include/exclude domains.'},
  {name: 'extensions', alias: 'e', type: Boolean, description: 'Will output stats for individual file extensions.'},
  {name: 'include', type: String, multiple: true, description: 'One or more space-separated domains/paths to include exclusively'},
  {name: 'ignore', type: String, multiple: true, description: 'One or more space-separated domains/paths to ignore'}
]

const cli = commandLineArgs(options)

try {
  let userOptions = cli.parse()

  if (userOptions.help) {
    showHelp()
  } else {
    let results = parser.parse(data.get(userOptions.filename), userOptions)
    outputTypes.console.createOutput(results, userOptions)
    outputTypes.json.createOutput(results, userOptions)
  }
} catch (e) {
  console.error('\nThe option you specified is not supported!')
  showHelp()
}

function showHelp () {
  console.log(cli.getUsage(options))
}
