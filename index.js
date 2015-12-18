#! /usr/bin/env node

'use strict'

const data = require('./lib/data')
const options = require('./lib/options').get()

if (options) {
  let results = require('./lib/parser').parse(data.get(options.src), options)

  require('./lib/outputTypes').forEach((type) => {
    type.createOutput(results, options)
  })
}
