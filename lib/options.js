'use strict'

const path = require('path')

const usageSettings = [
  {name: 'help', alias: 'h', type: Boolean, description: 'Display this usage guide.'},
  {name: 'src', alias: 's', type: String, description: 'The HAR JSON input file to process.'},
  {name: 'options', alias: 'o', type: String, description: 'The options JSON file to include/exclude domains.'},
  {name: 'extensions', alias: 'e', type: Boolean, description: 'Will output stats for individual file extensions.'},
  {name: 'include', type: String, multiple: true, description: 'One or more space-separated domains/paths to include exclusively'},
  {name: 'exclude', type: String, multiple: true, description: 'One or more space-separated domains/paths to exclude'}
]

const cli = require('command-line-args')(usageSettings)

exports.get = () => {
  var args, options

  try {
    args = cli.parse()
    options = args.options ? require(path.join(process.cwd(), args.options)) : args
  } catch (e) {
    if (e.name === 'UNKNOWN_OPTION') {
      console.log(cli.getUsage(usageSettings))
    } else if (args && args.options) {
      console.error('\nCould not load options file: ' + args.options + '\n')
    }
  }

  return options
}
