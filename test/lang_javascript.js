const markdown2code = require('markdown2code')

const fs = require('fs')
const input = fs.createReadStream('README.md')
const output = process.stdout

markdown2code(input, output)
