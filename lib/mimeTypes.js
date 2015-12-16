'use strict';

exports.css = {
    simple: /css/
};

exports.html = {
    simple: /html/
};

exports.scripts = {
    simple: /javascript|ecmascript/
};

exports.json = {
    simple: /json/
};

exports.fonts = {
    simple: /font|image\/svg+xml/,
    complex: {
        eot: /vnd.ms-fontobject/,
        woff: /font-woff/,
        ttf: /x-font-truetype/,
        svg: /image\/svg\+xml/,
        otf: /x-font-opentype/
    }
};

exports.images = {
    simple: /image/,
    complex: {
        gif: /gif/,
        jpg: /jpg|jpeg/,
        png: /png/
    }
};

exports.audio = {
    simple: /audio/,
    complex: {
        aif: /aiff/,
        mpeg: /audio\/mpeg/,
        midi: /audio\/midi/,
        mp3: /mpeg3|mpeg-3/,
        wav: /audio\/wav/
    }
};

exports.video = {
    simple: /video/,
    complex: {
        mov: /video\/quicktime/,
        mpeg: /video\/mpeg/
    }
};
