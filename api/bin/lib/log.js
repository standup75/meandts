const chalk = require('chalk')

module.exports = {
  write(message = '', {color, temp} = {}) {
    color = color || `yellowBright`
    if (typeof message === 'object') {
      message = JSON.stringify(message)
    }
    if (process.stdout) {
      if (process.stdout.clearLine) process.stdout.clearLine()
      if (temp && message && process.stdout.write && process.stdout.cursorTo) {
        process.stdout.write(chalk[color](message))
        process.stdout.cursorTo(0);
      }
    }
    if (!temp) {
      console.log(chalk[color](message))
    }
  },
  writeTmp(message = '', {color} = {}) {
    this.write(message, { color, temp: true })
  },
  error(message = '') {
    console.error(message)
  },
}
