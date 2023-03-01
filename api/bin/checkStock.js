require('rootpath')()
const runner = require('./lib/runner')
const parallel = require('./lib/parallel')
const log = require('./lib/log')
const http = require('src/lib/http')
const Product = require('src/models/product')

let updatedProductCount = 0
let i = 1
let productCount = 0
runner(async () => {
	const products = await Product.find({published: true}).exec()
	productCount = products.length
	log.writeTmp(`Checking first product...`)
	for (const product of products) {
		await parallel.addPromise(getProductAvailability(product))
	}
	await parallel.flush()
	log.write(`${updatedProductCount} products updated`)
})

async function getProductAvailability(product) {
	let needUpdate = false
	let productInStock = false
	for (const color of product.colors){
		let inStock = false
		for (const sku of color.skus) {
			needUpdate = await getAvailability(sku) || needUpdate
			inStock = sku.inStock || inStock
		}
		color.inStock = inStock
		productInStock = inStock || productInStock
	}
	product.inStock = productInStock
	if (needUpdate) {
		await product.save()
		updatedProductCount++
	}
	log.writeTmp(`Availability of product ${i++}/${productCount} checked (updated: ${needUpdate}). Checking next product...`)
}

async function getAvailability(sku) {
	const status = await http.get(`${process.env.CUSTOM_CAT_URL}/catalog/sku/${sku.skuId}?api_key=${process.env.CUSTOM_CAT_API_KEY}`)
	if (status.in_stock > 0) {
		if (sku.inStock == null || sku.inStock === false) {
			sku.inStock = true
			return true
		}
	} else {
		if (sku.inStock == null || sku.inStock === true) {
			sku.inStock = false
			return true
		}
	}
	return false
}
