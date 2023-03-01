require('rootpath')()
const http = require('src/lib/http')
const runner = require('../lib/runner')

const skuId = 30720

runner(async () => {
	const response = await http.get(`${process.env.CUSTOM_CAT_URL}/catalog/sku/${skuId}?api_key=${process.env.CUSTOM_CAT_API_KEY}`)
	console.log(JSON.stringify(response))
})
