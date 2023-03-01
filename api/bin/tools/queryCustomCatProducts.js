require('rootpath')()
const runner = require('../lib/runner')
const products = require('../data/customCatProducts')
const Product = require('../../src/models/product')
const color = "White"
runner(async () => {
	// products.forEach(p => console.log(p.product_name))
	// const product = products.find(p => p.product_name.startsWith(name))
	const dbProducts = await Product.find()
	const productNames = dbProducts.map(p => p.name)
	const filterProducts = products.filter(p => productNames.includes(p.product_name))
	console.log(`${productNames.length} products in the db - ${filterProducts.length} in Custom cat`)
	for (const product of filterProducts) {
		if (!product) {
			console.log('not found')
		} else {
			console.log(product.product_name)
			console.log(product.product_colors.map(pc => `${pc.color_hex} - ${pc.color}`))
		}
	}
	console.log(JSON.stringify(products[0]))
})