require('rootpath')()
const runner = require('../lib/runner')
const utils = require('src/lib/utils')
runner(async () => {
	await utils.sendEmail({
		email: 'stanislas.duprey@gmail.com',
		name: 'Stanislas Duprey',
		orderId: '20-2-XEL7V5',
	})
})