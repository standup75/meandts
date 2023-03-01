const TrendingHashtag = require('src/models/trendingHashtag')
module.exports = {
	async index(req, res) {
		await TrendingHashtag.refresh()
		res.status(200).json({ trendingHashtags: await TrendingHashtag.find({status: {$lt: TrendingHashtag.statuses.REMOVED}}).sort({ score: -1 }).exec() })
	},
	async show(req, res) {
		const trendingHashtag = await TrendingHashtag.findOne({ name: req.params.hashtag })
		res.status(200).json({ trendingHashtag })
	},
	async start(req, res) {
		if (req.body.imageUrl) {
			await TrendingHashtag.updateOne({ _id: req.params.trendingHashtagId}, { $set: {status: TrendingHashtag.statuses.STARTED, imageUrl: req.body.imageUrl }}).exec()
		} else {
			await TrendingHashtag.updateOne({ _id: req.params.trendingHashtagId}, { $set: {status: TrendingHashtag.statuses.STARTED }}).exec()
		}
		res.sendStatus(201)
	},
	async stop(req, res) {
		await TrendingHashtag.updateOne({ _id: req.params.trendingHashtagId}, { $set: {status: TrendingHashtag.statuses.INTERRUPTED }}).exec()
		res.sendStatus(201)
	},
	async destroy(req, res) {
		await TrendingHashtag.updateOne({ _id: req.params.trendingHashtagId}, { $set: {status: TrendingHashtag.statuses.REMOVED }}).exec()
		res.sendStatus(201)
	},
}