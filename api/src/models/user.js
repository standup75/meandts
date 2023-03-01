const mongoose = require('mongoose')
const utils = require('src/lib/utils')
const base = require("./base")

const userSchema = new mongoose.Schema({
	createdAt: Date,
	updatedAt: Date,
	username: {
		type: String,
		unique: true,
		required: true,
		index: true,
	},
	salt: String,
	hash: String,
})

userSchema.index({'username': 1})

userSchema.statics.signup = async function({ username, password }) {
	const result = await utils.hash(password)
	return await User.create({
		username,
		salt: result.salt,
		hash: result.hash,
	})
}

userSchema.methods.isValidPassword = async function(password) {
	if (this.salt && this.hash) {
		const result = await utils.hash(password, this.salt)
		const dbHashString = Buffer.from(this.hash, 'base64').toString('base64')
		const computedHashString = Buffer.from(result.hash.toString(), 'base64').toString('base64')
		if (computedHashString === dbHashString) {
			return this
		}
		return false
	}
}

userSchema.pre('save', function(next) {
  if (!this.createdAt) {
    this.createdAt = this.updatedAt = new Date
  } else {
    this.updatedAt = new Date
  }
  return next()
})

userSchema.statics.publicFields = ['createdAt', 'updatedAt', 'username' ]
userSchema.statics.names = {
  singular: "user",
  plural: "users"
}
const User = base(userSchema)
module.exports = User
