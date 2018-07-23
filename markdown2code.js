const readline = require('readline')

/**
 * @param {Stream} input
 * @param {Stream} output
 * @param {Object} [opt]
 * @param {String} [opt.lang] language filter
 */

function markdown2code (input, output, opt) {
  const read = readline.createInterface({ input })

  let insideCodeBlock = false
  let currentLang = ''

  read.on('line', data => {
    const startsWithBackticks = data.substring(0, 3) === '```'

    if (startsWithBackticks) {
      if (insideCodeBlock) {
        insideCodeBlock = false
      } else {
        insideCodeBlock = true
        currentLang = data.substring(3, data.length)
      }
    } else if (insideCodeBlock && opt.lang && opt.lang === currentLang) {
      output.write(`${data}\n`)
    }
  })
}

module.exports = markdown2code
