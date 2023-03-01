const utils = require('src/lib/utils')

module.exports = (app) => {
	// v1 routes
	app.use(`/api/v1/products`, require(`./v1/products`))
	app.use(`/api/v1/users`, require(`./v1/users`))
	app.use(`/api/v1/mockups`, require(`./v1/mockups`))
	app.use(`/api/v1/orders`, require(`./v1/orders`))
	app.use(`/api/v1/trendingHashtags`, require(`./v1/trendingHashtags`))
	app.use(`/api/v1/instagram`, require(`./v1/instagram`))
}