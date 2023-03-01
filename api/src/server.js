require('rootpath')()
require(`express-async-errors`)
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const expressLogging = require('express-logging')
const logger = require('logops')
const errorHandler = require('./middlewares/errorHandler')
const allowCrossDomain = require('./middlewares/allowCrossDomain')
const mongoose = require('mongoose')
const bodyParser = require(`body-parser`)

;(async () => {
	await mongoose.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	app.set('view engine', 'pug')
	app.set('views', 'src/views')
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(expressLogging(logger))
	app.use(allowCrossDomain)
	require('./routes')(app)
	app.use(errorHandler)
	app.get('/unsubscribe', (_, res) => {
		res.render('unsubscribe')
	})
	app.get('/', (_, res) => {
		res.render('welcome')
	})
	app.listen(port, () => console.log(`Me And Ts API listening on port ${port}!`))
})()