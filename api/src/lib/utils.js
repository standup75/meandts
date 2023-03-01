const crypto = require("crypto")
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_KEY)

getRandomInt = function(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

module.exports = {
	hash: (function() {
		const len = 128
		const iterations = 12000
		return async function(pwd, salt) {
			salt = salt || await new Promise((resolve, reject) => {
				return crypto.randomBytes(len, (err, salt) => {
					if (err) {
						return reject(err)
					}
					return resolve(salt.toString("base64"))
				})
			})
			return await new Promise((resolve, reject) =>
				crypto.pbkdf2(pwd, salt, iterations, len, 'sha1', (err, hash) =>
					err ? reject(err) : resolve({
						salt: salt,
						hash: hash
					})
				)
			)
		}
	})(),
	async sendEmail({ email, name, orderId, previewUrl }, templateId) {
		name = name || ''
		await sgMail.send({
			to: email,
			from: 'info@meandts.com',
			subject: 'Order confirmation from Me And T\'s!',
			text: ' ',
			html: ' ',
			templateId: templateId || process.env.SENDGRID_ORDER_TEMPLATE_ID,
			dynamic_template_data: { email, name, orderId, previewUrl },
		})
	},
	randomString(len) {
		const buf = []
		const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
		const charlen = chars.length
		let i = 0
		while (i < len) {
			buf.push(chars[getRandomInt(0, charlen - 1)])
			++i
		}
		return buf.join("")
	},
}
