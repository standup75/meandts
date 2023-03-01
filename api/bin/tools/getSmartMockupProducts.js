require('rootpath')()
const runner = require('../lib/runner')
const fetch = require('node-fetch')
runner(async () => {
	let response = await fetch(`https://public-api.smartmockups.com/v1/mockups`, {
		method: 'GET',
		headers: {
			'x-api-key': process.env.SMARTMOCKUP_API_KEY,
		}
	})
  response = await response.json()
  console.log(response)

  const categories = new Set
  response.forEach(p => {
    categories.add(p.category)
  })
  console.log(Array.from(categories))
})
