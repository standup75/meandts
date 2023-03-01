const fetch = require('node-fetch')
const Twitter = require('twitter')
const client = new Twitter({
	consumer_key: process.env.TWITTER_CONSUMER_API_KEY,
	consumer_secret: process.env.TWITTER_CONSUMER_SECRET_KEY,
	access_token_key: process.env.TWITTER_ACCESS_TOKEN,
	access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
})
// lookup bin/data/places.js
const woeids = [
	'23424977', // US
	'2357536', // Austin
	'2358820', // Baltimore
	'2367105', // Boston
	'2379574', // Chicago
	'2388929', // Dallas
	'2391585', // Detroit
	'2424766', // Houston
	'2442047', // Los Angeles
	'2450022', // Miami
	'2458833', // New Orleans
	'2459115', // New York
	'2471217', // Philadelphia
	'2487956', // San Francisco
	'2514815', // Washington
]

module.exports = {
	async getTrendingHashtags() {
		const trends = {}
		for (const woeid of woeids) {
			const response = await client.get('trends/place', {id: woeid})
			const woeidTrends = response[0]
				.trends
				.filter(t => parseInt(t.tweet_volume) && t.name[0] === '#')
				.map(t => ({
					score: t.tweet_volume,
					...t
				}))
			for (const trend of woeidTrends) {
				if (!trends[trends.name]) trends[trend.name] = trend
			}
		}
		return Object.values(trends)
	},
	async getPlaces() {
		return await client.get('trends/available', {})
	},
	async post(content, params) {
		return await client.post('statuses/update', { status: content, ...params })
	},
	async upload(url) {
		const response = await fetch(url, { method: 'GET' })
		const media = await response.buffer()
		const media_type = response.headers.get('Content-Type').replace('jpeg', 'jpg')
		const init = await client.post('media/upload', { command: 'INIT', total_bytes: media.length, media_type })
		const media_id = init.media_id_string
		await client.post('media/upload', { command: 'APPEND', media_id, media, segment_index: 0 })
		await client.post('media/upload', { command: 'FINALIZE', media_id })
		return media_id
	},
}
