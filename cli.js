#!/usr/bin/env node

const fs = require('fs')

const markdown2code = require('./markdown2code')

const pkg = require('./package.json')
process.title = pkg.name

const filepath = process.argv[2]

const input = fs.createReadStream(filepath)
const output = process.stdout

markdown2code(input, output)
