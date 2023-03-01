require('rootpath')()
const runner = require('../lib/runner')
const fs = require('fs')
const http = require('src/lib/http')

runner(async () => {
	let catalog = []
	let index = 1
	do {
		page = await http.get(`${process.env.CUSTOM_CAT_URL}/catalog?api_key=${process.env.CUSTOM_CAT_API_KEY}&page=${index++}&limit=250`)
		catalog = [...catalog, ...page]
		console.log(`page ${index-1}: ${page.length} products`)
	} while (page.length > 0)
	index = 1
	do {
		page = await http.get(`${process.env.CUSTOM_CAT_URL}/catalog?api_key=${process.env.CUSTOM_CAT_API_KEY}&page=${index++}&limit=250&category=sublimation`)
		catalog = [...catalog, ...page]
		console.log(`page ${index-1}: ${page.length} products`)
	} while (page.length > 0)

	fs.writeFileSync('bin/data/customCatProducts.js', 'module.exports = ' + JSON.stringify(catalog))
})