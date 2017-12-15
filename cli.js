#!/usr/bin/env node

const fs = require('fs')
const nopt = require('nopt')

const markdown2code = require('./markdown2code')

const pkg = require('./package.json')
process.title = pkg.name

const knownOpts = {
  format: String,
  lang: String,
  help: Boolean,
  version: Boolean
}

const shortHandOpts = {
  f: '--format',
  h: '--help',
  l: '--lang',
  v: '--version'
}

const args = process.argv

const opt = nopt(knownOpts, shortHandOpts, args, 2)

if (opt.version) {
  console.log(pkg.version)
  process.exit(0)
}

if (opt.help) {
  // The Usage, Options and Examples sections are copied from README.md
  console.log(`
${pkg.name} v${pkg.version} (${pkg.homepage})

> ${pkg.description}

### Usage

    markdown2code [--format JSON|text] [--lang <language>] file.md

### Options

* -f --format [text|JSON] output format, defaults to text
* -l --lang language filter
* -h --help shows this text message
* -v --version prints package version

### Examples

Extract all javascript snippets in text format

    markdown2code --lang javascript README.md

Extract all code snippets in JSON format

    markdown2code --format JSON README.md
`)

  process.exit(0)
}

const filepath = opt.argv.remain[0]

const input = fs.createReadStream(filepath)
const output = process.stdout

let format

if ((opt.format === 'text') || (opt.format === 'JSON')) {
  format = opt.format
}

const language = opt.lang

markdown2code(input, output, {
  format,
  language
})
