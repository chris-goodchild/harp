'use strict';

exports.css = {
    all: /css/
};

exports.html = {
    all: /html/
};

exports.scripts = {
    all: /javascript|ecmascript/
};

exports.json = {
    all: /json/
};

exports.fonts = {
    all: /font|image\/svg+xml/,
    extensions: {
        eot: /vnd.ms-fontobject/,
        woff: /font-woff/,
        ttf: /x-font-truetype/,
        svg: /image\/svg\+xml/,
        otf: /x-font-opentype/
    }
};

exports.images = {
    all: /image/,
    extensions: {
        gif: /gif/,
        jpg: /jpg|jpeg/,
        png: /png/
    }
};

exports.audio = {
    all: /audio/,
    extensions: {
        aif: /aiff/,
        mpeg: /audio\/mpeg/,
        midi: /audio\/midi/,
        mp3: /mpeg3|mpeg-3/,
        wav: /audio\/wav/
    }
};

exports.video = {
    all: /video/,
    extensions: {
        mov: /video\/quicktime/,
        mpeg: /video\/mpeg/
    }
};
