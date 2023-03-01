const log = require("./log")
let promises = []
const connections = 20
let flushCount = 1

module.exports = {
  async addPromise(p) {
    if (!p instanceof Promise) {
      console.error(`${p} is not a Promise!`)
      return
    }
    promises.push(p)
    if (promises.length === connections) {
      await Promise.all(promises).then(() => {
        log.writeTmp(`flush! ${flushCount++}`, {color: 'green'})
      })
      promises = []
    }
  },
  async flush() {
    await Promise.all(promises)
    promises = []
  },
}