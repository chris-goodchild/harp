'use strict';

exports.parse = (data, options) => {
    var entries = data.log.entries.filter(excludePreflight),
        results = { all: null, custom: null };

    results.pages = data.log.pages.reduce((pages, page) => {
        return pages.concat(page.title);
    }, []);

    results.allData = entries.reduce((metrics, entry) => {
        metrics.bytes += entry.response.content.size;
        metrics.time += entry.time;
        return metrics;
    }, createResult());

    results.customData = entries.filter(includeCustomData(options)).reduce((metrics, entry) => {
        var contentSize = entry.response.content.size;

        for (let fileType in metrics.fileTypes) {
            let item = metrics.fileTypes[fileType];

            if (item.pattern.test(getContentType(entry.response.headers))) {
                item.bytes += contentSize;
                item.time += entry.time;
                metrics.totals.bytes += contentSize;
                metrics.totals.time += entry.time;
            }
        }

        return metrics;
    }, {
        fileTypes: {
            css: createResult(/css/),
            html: createResult(/html/),
            fonts: createResult(/font/),
            images: createResult(/image/),
            scripts: createResult(/javascript|ecmascript/),
            json: createResult(/json/),
            audio: createResult(/audio/),
            video: createResult(/video/)
        },
        totals: createResult()
    });

    return results;
};


function createResult(mimeTypeRegExp) {
    return Object.create({ bytes: 0, time: 0, pattern: mimeTypeRegExp });
}

function createDomainsRegExp(domains) {
    return domains && domains.length && new RegExp(domains.join('|'), 'gi');
}

function getContentType(headers) {
    var contentType = headers.filter((header) => {
        return header.name.toLowerCase() === 'content-type';
    })[0];

    return contentType && contentType.value;
}

function excludePreflight(entry) {
    return entry.request.method.toLowerCase() !== 'options';
}

function includeCustomData(options) {
    var includeRegExp = createDomainsRegExp(options.include),
        excludeRegExp = createDomainsRegExp(options.exclude);

    return (entry) => {
        return getContentType(entry.response.headers) && (
                (!includeRegExp && !excludeRegExp) ||
                (includeRegExp && includeRegExp.test(entry.request.url)) ||
                (excludeRegExp && !excludeRegExp.test(entry.request.url))
            );
    };
}