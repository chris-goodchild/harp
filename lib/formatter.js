'use strict';

/**
 * Pinched this snippet from SO to save time. Cheers Aliceljm :)
 * http://stackoverflow.com/a/18650828
 **/
exports.formatBytes = (bytes, decimals) => {
    if (bytes == 0) return '0 bytes';
    var k = 1000;
    var dm = decimals + 1 || 3;
    var sizes = ['bytes', 'kb', 'mb', 'gb', 'tb', 'pb', 'eb', 'zb', 'yb'];
    var i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toPrecision(dm) + ' ' + sizes[i];
};

exports.formatPercentage = (numA, numB) => {
    return Math.floor((numA / numB) * 100) + '%';
};

exports.formatTime = (ms) => {
    if (ms >= 60000) return (ms / (1000 * 60)).toFixed(1) + ' min';
    if (ms >= 1000) return (ms / 1000).toFixed(1) + ' sec';
    return ms.toFixed(1) + ' ms';
};
