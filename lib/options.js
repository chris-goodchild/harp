'use strict'

const path = require('path')

const usageSettings = [
  {name: 'help', alias: 'h', type: Boolean, description: 'Display this usage guide.'},
  {name: 'src', alias: 's', type: String, description: 'The HAR JSON input file to process.'},
  {name: 'options', alias: 'o', type: String, description: 'The options JSON file to include/exclude domains.'},
  {name: 'extensions', alias: 'e', type: Boolean, description: 'Will output stats for individual file extensions.'},
  {name: 'include', type: String, multiple: true, description: 'One or more space-separated domains/paths to include exclusively'},
  {name: 'ignore', type: String, multiple: true, description: 'One or more space-separated domains/paths to ignore'}
]

const cli = require('command-line-args')(usageSettings)

exports.get = () => {
  var args, options

  try {
    args = cli.parse()
  } catch (e) {
    cli.getUsage(usageSettings)
    return
  }

  try {
    options = args.options ? require(path.join(process.cwd(), args.options)) : args
  } catch (e) {
    console.error('\nCould not load file: ' + args.options)
    return
  }

  return options
}
