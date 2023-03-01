require('rootpath')()
const runner = require('../lib/runner')
const log = require('../lib/log')
const TrendingHashtag = require('src/models/trendingHashtag')
const twitter = require('src/lib/twitter')

runner(async () => {
	// delete old trending hashtags
	const ONE_WEEK_AGO = 1000 * 3600 * 24 * 7
	await TrendingHashtag.remove({creeatedAt: {$lt: ONE_WEEK_AGO}})
	// retrieve hashtags
	const trends = await twitter.getTrendingHashtags()
	// save hastags
	for (const trend of trends) {
		log.write(`${trend.name} - ${trend.score}`)
		// await TrendingHashtag.create(trend)
		// log.writeTmp(`${trend.name} created`)
	}
	log.write(`${trends.length} trending hashtags saved`)
})
