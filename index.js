#! /usr/bin/env node

'use strict'

const options = require('./lib/options').get()
const results = require('./lib/parser').parse(require('./lib/data').get(options.src), options)

require('./lib/outputTypes').forEach((type) => {
  type.createOutput(results, options)
})
