'use strict';

const Table = require('cli-table');
const formatter = require('./formatter');

exports.createOutput = (results, complex) => {
    var output = ['\n', 'Captured network activity for:', '\n'].join('');
    output += results.pages.join('\n') + '\n'.repeat(3);
    output += createCustomDataTable(results.customData.fileTypes, complex) + '\n';
    output += createTotalsTable(results.customData.totals, results.allData) + '\n';
    console.log(output);
    return output;
};

function createCustomDataTable(data, complex) {
    var table = createTable({ head: ['File Type', 'Download Size', 'Download Time'] });

    for (let fileType in data) {
        table.push([
            fileType.toUpperCase(),
            formatter.formatBytes(data[fileType].bytes, 2),
            formatter.formatTime(data[fileType].time)
        ]);

        if (complex && data[fileType].complex) {
            for (let extName in data[fileType].complex) {
                let ext = data[fileType].complex[extName];
                table.push([
                    [' '.repeat(2), extName].join('.'),
                    formatter.formatBytes(ext.bytes, 2),
                    formatter.formatTime(ext.time)
                ]);
            }
        }
    }

    return table.toString();
}

function createTotalsTable(data, all) {
     var table = createTable();
    
    table.push(
        { 'Total Size': [formatter.formatBytes(data.bytes, 2), getPercentage(data.bytes, all.bytes)] },
        { 'Total Time': [formatter.formatTime(data.time), getPercentage(data.time, all.time)] }
    );

    return table.toString();
}

function getPercentage(numA, numB) {
    return formatter.formatPercentage(numA, numB) + ' of total';
}

function createTable(options) {
    return new Table(Object.assign({ colWidths: [30, 30, 30] }, options));
}