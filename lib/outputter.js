'use strict';

const Table = require('cli-table');
const formatter = require('./formatter');

exports.createOutput = (results) => {
    var output = ['\n', 'Captured network activity for:', '\n'].join('');
    output += results.pages.join('\n') + '\n'.repeat(3);
    output += createCustomDataTable(results.customData.fileTypes) + '\n';
    output += createTotalsTable(results.customData.totals, results.allData) + '\n';
    console.log(output);
    return output;
};

function createCustomDataTable(data) {
    var table = createTable({ head: ['File Type', 'Download Size', 'Download Time'] });

    for (let fileType in data) {
        if (data.hasOwnProperty(fileType)) {
            table.push([
                fileType.toUpperCase(),
                formatter.formatBytes(data[fileType].bytes, 2),
                formatter.formatTime(data[fileType].time)
            ]);
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