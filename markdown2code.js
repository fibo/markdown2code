const readline = require('readline')

/**
 * @param {Stream} input
 * @param {Stream} output
 */

function markdown2code (input, output) {
  input.on('open', () => { output.write('[\n') })

  input.on('close', () => { output.write('\n]') })

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

        output.write('\n    ]\n  }')
      } else {
        insideCodeBlock = true

        if (firstCodeBlock) firstCodeBlock = false
        else output.write(',')

        output.write('  {\n')

        lang = data.substring(3, data.length)

        if (lang !== '') output.write(`    "lang": "${lang}"\n`)

        output.write(`    "code": [`)
      }
    } else {
      if (insideCodeBlock) {
        if (firstCodeLine) firstCodeLine = false
        else output.write(',')

        output.write('\n')
        output.write(`      "${data.replace(/"/g, '\\"')}"`)
      }
    }
  })
}

module.exports = markdown2code
