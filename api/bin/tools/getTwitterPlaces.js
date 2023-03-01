require('rootpath')()
const runner = require('../lib/runner')
const fs = require('fs')
const twitter = require('src/lib/twitter')

runner(async () => {
	const places = await twitter.getPlaces()
	fs.writeFileSync('bin/data/places.js', `module.exports = ${JSON.stringify(places)}`)
})
