'use strict';

const mimeTypes = require('./mimeTypes');

exports.parse = (data, userOptions) => {
    var entries = data.log.entries.filter(excludePreflight),
        results = { all: null, custom: null };

    results.pages = data.log.pages.reduce((pages, page) => {
        return pages.concat(page.title);
    }, []);

    results.allData = entries.reduce((data, entry) => {
        data.bytes += entry.response.content.size;
        data.time += entry.time;
        return data;
    }, createResult());

    results.customData = entries.filter(includeCustomData(userOptions.options)).reduce((data, entry) => {
        var content = entry.response.content;

        for (let type in data.fileTypes) {
            let item = data.fileTypes[type];

            if (item.pattern.test(content.mimeType)) {
                item.bytes += content.size;
                item.time += entry.time;
                data.totals.bytes += content.size;
                data.totals.time += entry.time;
            }

            if (!item.extensions) continue;

            for (let type in item.extensions) {
                let subItem = item.extensions[type];

                if (subItem.pattern.test(content.mimeType)) {
                    subItem.bytes += content.size;
                    subItem.time += entry.time;
                }
            }
        }

        return data;
    }, {
        fileTypes: createFileTypes(userOptions),
        totals: createResult()
    });

    return results;
};

function createFileTypes(userOptions) {
    return Object.keys(mimeTypes).reduce((fileTypes, key) => {
        fileTypes[key] = createResult(mimeTypes[key].all);

        if (userOptions.extensions && mimeTypes[key].extensions) {
            let extensions = mimeTypes[key].extensions;
            fileTypes[key].extensions = Object.keys(extensions).reduce((ext, name) => {
                ext[name] = createResult(extensions[name]);
                return ext;
            }, {});
        }

        return fileTypes;
    }, {});
}

function createResult(mimeTypeRegExp) {
    return { bytes: 0, time: 0, pattern: mimeTypeRegExp };
}

function createDomainsRegExp(domains) {
    return domains.length && new RegExp(domains.join('|'), 'gi');
}

function excludePreflight(entry) {
    return entry.request.method.toLowerCase() !== 'options';
}

function includeCustomData(options) {
    var includeRegExp = options && createDomainsRegExp(options.include),
        excludeRegExp = options && createDomainsRegExp(options.exclude);

    return (entry) => {
        return entry.response.content.mimeType && (
                (!includeRegExp && !excludeRegExp) ||
                (includeRegExp && includeRegExp.test(entry.request.url)) ||
                (excludeRegExp && !excludeRegExp.test(entry.request.url))
            );
    };
}