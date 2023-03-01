require('rootpath')()
const runner = require('../lib/runner')
const products = require('../data/printfulCatalog')
const fs = require('fs')
const http = require('src/lib/http')
const authorization = 'MmRhZWwyb3MtdmF5cS1hbnJqOjEwOTEtaHFxbXY3dmM2NGE2'

runner(async () => {
	let index = 1
	for (const product of products) {
		const response = await http.get(`https://api.printful.com/products/${product.id}`, { authorization })
		if (response && response.result && response.result.variants && response.result.variants.length) {
			const prices = response.result.variants.map(p => parseInt(p.price))
			product.minPrice = Math.min(...prices)
			product.maxPrice = Math.max(...prices)
		}
		console.log(`${index++}/${products.length} done`)
	}
	fs.writeFileSync('bin/data/printfulPrices.csv', 'name,min price,max price\n' + products.map(p => `${p.model},${p.minPrice},${p.maxPrice}`).join('\n'))
})