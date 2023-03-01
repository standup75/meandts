const fetch = require('node-fetch')
const { URLSearchParams } = require('url')

module.exports = {
	get(url, options) {
		return http(url, `GET`, null, Object.assign({ parseJson: true }, options || {}))
	},
	post(url, body, options) {
		return http(url, `POST`, body, Object.assign({ parseJson: false }, options || {}))
	},
	put(url, body, options) {
		return http(url, `PUT`, body, Object.assign({ parseJson: false }, options || {}))
	},
	async exists(url) {
		try {
			await this.get(url, {parseJson: false})
		} catch (err) {
			return false
		}
		return true
	},
}
async function http(url, method, body, options) {
	const params = {
		method: method,
		headers: {}
	}
	if (options.parseJson) {
		params.headers['Accept'] = 'application/json'
	}
	if (options.authorization) {
		params.headers.Authorization = `Basic ${options.authorization}`
	}
	if (body) {
		if (options.formData) {
			const formData = new URLSearchParams()
			Object.keys(body).forEach(key => {
				formData.append(key, body[key])
			})
			params.body = formData
		} else {
			params.headers['Content-Type'] = 'application/json'
			params.body = JSON.stringify(body)
		}
	}
	let response = await fetch(url, params)
	if (options.parseJson) {
		return await response.json()
	} else {
		return response
	}
}
