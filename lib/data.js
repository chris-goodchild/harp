'use strict';

const path = require('path');

const sampleInfo = [
    'Using sample data from google.com - create a custom har.json file for your web page (see README for instructions)',
    'Note: harp should be run in the directory that contains the har.json - example:\n',
    indent('$ cd /path-to-data/', 4),
    indent('$ harp --src myCustomData.json', 4)
];

exports.get = (filename) => {
    var data, error;

    try {
        data = require(path.join(process.cwd(), filename));
    } catch (e) {
        console.log.call(console, '\n' + sampleInfo.join('\n'));
        data = require('../samples/data.json');
        error = e;
    }

    if (!error) {
        console.log('\nUsing '+ filename +'...');
    }

    return data;
};

function indent(str, spaces) {
    return ' '.repeat(spaces) + str;
}