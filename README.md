[![Build Status](https://travis-ci.org/chris-goodchild/harper.svg)](https://travis-ci.org/chris-goodchild/harper)
[![Dependency Status](https://david-dm.org/chris-goodchild/harper.svg)](https://david-dm.org/chris-goodchild/harper)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

# Harper (HTTP Archive Parser)

A CLI tool that parses HAR (HTTP Archive) data for common web file types and logs the results


## Basic Usage

1. Unzip the files anywhere on your system
2. `$ cd <path-to-harper>`
3. `$ npm link`
4. `$ cd <path-to-data>/myCustomHarData.json`
5. `$ harper --src myCustomHarData.json`

By default, if you don't specify a file name the tool will use a sample data file to demonstrate the output. To get
your own HAR data you can follow these steps:

1. Open Chrome
2. Open Chrome's Dev Tools (F12)
3. Open the network tab
4. Load the page you want to collect data for
5. Once you have what you need, right-click on the network tab results and click "Copy all as HAR"
6. Paste the data into a file and save as "myCustomHarData.json" (or whatever)


## CLI Options

### src

The HAR JSON file you want to parse

```
$ harper --src data.json
```
```
$ harper -s data.json
```

### options

The options JSON containing domains/paths to include/ignore (see "Harper Options JSON")

```
$ harper --options options.json
```
```
$ harper -o options.json
```

### extensions

Determines whether to display a breakdown of data for each extension

```
$ harper --extensions
```
```
$ harper -e
```

### include

One or more space-separated domains/paths to include exclusively

```
$ harper --include http://my.special.domain images/includeImage.png
```

### exclude

One or more space-separated domains/paths to ignore

```
$ harper --exclude http://ignored.cdn.com path-to/ignored.json
```

### help

Shows the help menu

```
$ harper --help
```
```
$ harper -h
```


## Harper Options JSON

If you have a large number of domains/paths to include or ignore, you can pass a path to an options JSON file in order
to specify these strings (see `harper/samples/options.json`).

Note: both include and ignore can be specified but *include will take precedence*.

To load these options, simply place the options.json file in the same directory as your data and run:

```
$ harper --src myCustomHarData.json --options myOptions.json
```


## Supported File Types

The script currently gives a simplistic output of totals for the following file types, including the downloaded size and
time taken to transfer the data:

- CSS
  - .css
- HTML
  - .html
- Fonts
  - .eot
  - .woff
  - .ttf
  - .svg
  - .otf
- Images
  - .gif
  - .jpg
  - .png
- Scripts
  - .js
- JSON
  - .json
- Audio
  - .aif
  - .mpeg
  - .midi
  - .mp3
  - .wav
- Video
  - .mov
  - .mpeg


## Output formats

- Command line console
- JSON

Note: by default, any file output will be created in whichever folder you execute Harper in the format `/.harper/harper.json`


## Roadmap

- Write some tests for value conversions
- Create alternative output formats (HTML, XML, TXT, etc)

