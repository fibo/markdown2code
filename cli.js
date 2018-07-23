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
  console.log(`
markdown2code [--lang <language>] file.md

For more info point your browser to ${pkg.homepage}
`)

  process.exit(0)
}

const filepath = opt.argv.remain[0]

const input = fs.createReadStream(filepath)
const output = process.stdout

markdown2code(input, output, opt)
