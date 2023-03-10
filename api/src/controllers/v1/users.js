const User = require('src/models/user')
const jwt = require('jsonwebtoken')

module.exports = {
	async authenticate(req, res) {
		const user = await User.findOne({ username: req.query.username }).exec()
		if (user && await user.isValidPassword(req.query.password)) {
			const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET)
			res.status(200).json({ user, token })
		} else {
			res.sendStatus(401)
		}
	},
	async create(req, res) {
		res.status(401).json({ error: 'signup deactivated' })
		// const user = await User.signup(req.body)
		// res.status(201).json({ user })
	},
}