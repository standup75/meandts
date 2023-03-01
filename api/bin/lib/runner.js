const mongoose = require('mongoose')
const log = require("./log")

module.exports = async (fn) => {
	await mongoose.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	try {
		await fn()
		log.write("done")
		return process.exit()
	} catch (err) {
		log.error(err)
		return process.exit()
	}
}
