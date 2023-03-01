require('rootpath')()
const runner = require('../lib/runner')
const Product = require('src/models/product')

const skuId = 30720

runner(async () => {
	const products = await Product.find().exec()
	const product = products.find(p => p.colors.find(c => c.skus.find(s => s.skuId == skuId)))
	console.log(JSON.stringify(product || {}))
})

