export function httpGet(url, options) {
	return http(url, `GET`, null, options || { parseJson: true })
}
export function httpPost(url, body, options) {
	return http(url, `POST`, body, options || { parseJson: false })
}
export function httpPut(url, body, options) {
	return http(url, `PUT`, body,  options || { parseJson: false })
}
export function httpDelete(url, body, options) {
	return http(url, `DELETE`, body,  options || { parseJson: false })
}
export async function exists(url, options = {}) {
	if (options.isImage) {
		return await new Promise((resolve) => {
			const img = document.createElement('img')
			img.onload = () => resolve(true)
			img.onerror = () => resolve(false)
			img.src = url
		})
	} else {
		try {
			await http(url, `HEAD`, null, {parseJson: false, ...options})
		} catch (err) {
			return false
		}
		return true
	}
}
async function http(url, method, body, options) {
	const params = {
		method: method,
		headers: {}
	}
	params.headers['Content-Type'] = 'application/json'
	if (options.parseJson) {
		params.headers['Accept'] = 'application/json'
	}
	if (localStorage.jwtToken) {
		params.headers['Authorization'] = `Bearer ${localStorage.jwtToken}`
	}
	if (body) {
		params.body = JSON.stringify(body)
	}
	if (!options.external) {
		url = `${process.env.VUE_APP_API_URL}/api/v1/${url}`
	}
	let response = await fetch(url, params)
	if (options.parseJson) {
		return await response.json()
	} else {
		return response
	}
}
