#!/usr/bin/env node

const fs = require('fs')
const readline = require('readline')

const pkg = require('./package.json')
process.title = pkg.name

const filepath = process.argv[2]

const input = fs.createReadStream(filepath)

input.on('open', () => {
  process.stdout.write('[\n')
})

input.on('close', () => {
  process.stdout.write('\n]\n')
})

const read = readline.createInterface({ input })

let firstCodeBlock = true
let firstCodeLine = true
let insideCodeBlock = false
let lang = null

read.on('line', data => {
  const startsWithBackticks = data.substring(0, 3) === '```'

  if (startsWithBackticks) {
    if (insideCodeBlock) {
      insideCodeBlock = false
      firstCodeLine = true

      process.stdout.write('\n    ]\n  }')
    } else {
      insideCodeBlock = true

      if (firstCodeBlock) firstCodeBlock = false
      else process.stdout.write(',')

      process.stdout.write('  {\n')

      lang = data.substring(3, data.length)

      if (lang !== '') process.stdout.write(`    "lang": "${lang}"\n`)

      process.stdout.write(`    "code": [`)
    }
  } else {
    if (insideCodeBlock) {
      if (firstCodeLine) firstCodeLine = false
      else process.stdout.write(',')

      process.stdout.write('\n')
      process.stdout.write(`      "${data.replace(/"/g, '\\"')}"`)
    }
  }
})
