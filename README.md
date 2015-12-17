[![Build Status](https://travis-ci.org/chris-goodchild/harp.svg)](https://travis-ci.org/chris-goodchild/harp)
[![Dependency Status](https://david-dm.org/chris-goodchild/harp.svg)](https://david-dm.org/chris-goodchild/harp)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

# HARP (HTTP Archive Parser)

A CLI tool that parses HAR (HTTP Archive) data for common web file types and logs the results


## Basic Usage

1. Unzip the files anywhere on your system
2. `$ cd <path-to-harp>`
3. `$ npm link`
4. `$ cd <path-to-data>/myCustomHarData.json`
5. `$ harp --src myCustomHarData.json`

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

`$ harp --src data.json`
`$ harp -s data.json`

### options

The options JSON containing domains/paths to include/ignore (see "HARP Options JSON")

`$ harp --options options.json`
`$ harp -o options.json`

### extensions

Determines whether to display a breakdown of data for each extension

`$ harp --extensions`
`$ harp -e`

### include

One or more space-separated domains/paths to include exclusively 

`$ harp --include http://my.special.domain images/includeImage.png`

### ignore

One or more space-separated domains/paths to ignore 

`$ harp --ignore http://ignored.cdn.com path-to/ignored.json`

### help

Shows the help menu

`$ harp --help`
`$ harp -h`


## HARP Options JSON

If you have a large number of domains/paths to include or ignore, you can pass a path to an options JSON file in order 
to specify these strings (see `harp/samples/options.json`).

Note: both include and ignore can be specified but *include will take precedence*.

To load these options, simply place the options.json file in the same directory as your data and run:

`$ harp --src myCustomHarData.json --options myOptions.json`


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

By default the script will output results to the console only. Support for other output formats will come in a later 
version.


## Roadmap

- Write some tests for value conversions
- Create alternative output formats (HTML, JSON, XML, TXT, etc)
- Maybe publish to NPM if it's useful enough :)

