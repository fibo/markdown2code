const readline = require('readline')

/**
 * @param {Stream} input
 * @param {Stream} output
 * @param {Object} [opt]
 * @param {String} [opt.format] can be text (default) or JSON
 * @param {String} [opt.language] filter
 */

function markdown2code (input, output, opt) {
  const formatIsJSON = opt.format ? opt.format !== 'text' : false

  input.on('open', () => { if (formatIsJSON) output.write('[\n') })

  input.on('close', () => { if (formatIsJSON) output.write('\n]') })

  const read = readline.createInterface({ input })

  let firstCodeBlock = true
  let firstCodeLine = true
  let insideCodeBlock = false
  let lang = ''

  read.on('line', data => {
    const startsWithBackticks = data.substring(0, 3) === '```'

    if (startsWithBackticks) {
      if (insideCodeBlock) {
        insideCodeBlock = false
        firstCodeLine = true

        if (formatIsJSON) output.write('\n    ]\n  }')
      } else {
        insideCodeBlock = true
        lang = data.substring(3, data.length)

        if (formatIsJSON) {
          if (firstCodeBlock) firstCodeBlock = false
          else output.write(',')

          output.write('  {\n')

          if (lang !== '') output.write(`    "lang": "${lang}"\n`)

          output.write(`    "code": [`)
        }
      }
    } else {
      if (insideCodeBlock) {
        if (opt.language && opt.language !== lang) return

        if (formatIsJSON) {
          if (firstCodeLine) firstCodeLine = false
          else output.write(',')

          output.write('\n')
          // Write line of code, escape double quotes.
          output.write(`      "${data.replace(/"/g, '\\"')}"`)
        } else {
          output.write(`${data}\n`)
        }
      }
    }
  })
}

module.exports = markdown2code
