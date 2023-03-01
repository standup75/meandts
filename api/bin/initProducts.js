require('rootpath')()
const runner = require('./lib/runner')
const log = require('./lib/log')
const parallel = require('./lib/parallel')
const http = require('src/lib/http')
const Product = require('src/models/product')

runner(async () => {
	let catalog = []
	let index = 1
	log.write('fetching printing products...')
	do {
		page = await http.get(`${process.env.CUSTOM_CAT_URL}/catalog?api_key=${process.env.CUSTOM_CAT_API_KEY}&page=${index++}&limit=250`)
		catalog = [...catalog, ...page]
		log.write(`page ${index-1}: ${page.length} products`)
	} while (page.length > 0)
	log.write('fetching sublimation products...')
	index = 1
	do {
		page = await http.get(`${process.env.CUSTOM_CAT_URL}/catalog?api_key=${process.env.CUSTOM_CAT_API_KEY}&page=${index++}&limit=250&category=sublimation`)
		catalog = [...catalog, ...page]
		log.write(`page ${index-1}: ${page.length} products`)
	} while (page.length > 0)
	index = catalog.length
	// await Product.deleteMany({})
	for (const product of catalog) {
		// const { min, max } = getMinMaxCost(product.product_colors)
		// await parallel.addPromise(Product.create({
		// 	name: product.product_name,
		// 	description: getDescriptions(product),
		// 	published: false,
		// 	colors: getColors(product.product_colors),
		//  minCost: min,
		//  maxCost: max,
		// }))
		await parallel.addPromise(updatePrices(product))
		log.writeTmp(`Products left to create: ${index--}`)
	}
	await parallel.flush()
})

async function updatePrices(product) {
	const dbProduct = await Product.findOne({name: product.product_name}).exec()
	if (dbProduct) {
		dbProduct.colors = getColors(product.product_colors)
		const { min, max } = getMinMaxCost(product.product_colors)
		dbProduct.minCost = min
		dbProduct.maxCost = max
		await dbProduct.save()
	}
}

function getDescriptions(product) {
	const descriptions = []
	for (let i = 1; i < 6; i++) {
		if (product[`product_description_bullet${i}`]) {
			descriptions.push(product[`product_description_bullet${i}`])
		}
	}
	return descriptions
}

function getColors(productColors) {
	const colors = []
	for (const productColor of productColors) {
		const color = {
			frontUrl: productColor.product_image,
			backUrl: productColor.back_image,
			name: productColor.color,
			hex: productColor.color_hex,
		}
		color.skus = productColor.skus.map(sku => ({
			cost: sku.cost,
			size: sku.size,
			skuId: sku.catalog_sku_id,
		}))
		colors.push(color)
	}
	return colors
}

function getMinMaxCost(productColors) {
	let min = 10000000
	let max = -1
	for (const productColor of productColors) {
		for (const sku of productColor.skus) {
			min = Math.min(sku.cost, min)
			max = Math.max(sku.cost, max)
		}
	}
	return { min, max }	
}