const mongoose = require('mongoose');
const base = require("./base")
const twitter = require('src/lib/twitter')

const trendingHashtagSchema = new mongoose.Schema({
	createdAt: Date,
	updatedAt: Date,
	name: String,
	url: String,
	score: Number,
	status: {type: Number, default: 0},
	imageUrl: String,
	posts: [{
		mediaId: String,
		createdAt: Date,
		previewUrl: String,
		product: { type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true },
		recycled: Boolean,
	}],
}, {
	usePushEach: true,
});

trendingHashtagSchema.pre('save', function(next) {
	if (!this.createdAt) {
		this.createdAt = this.updatedAt = new Date;
	} else {
		this.updatedAt = new Date;
	}
	return next();
})
trendingHashtagSchema.statics.refresh = async function() {
	const th = await TrendingHashtag.findOne({status: 0}).exec()
	const TEN_MIN_AGO = Date.now() - 1000 * 60 * 10
	if (!th || th.createdAt.getTime() < TEN_MIN_AGO) {
		await TrendingHashtag.remove({status: 0}).exec()
		const ths = await twitter.getTrendingHashtags()
		for (const th of ths) {
			const savedTh = await TrendingHashtag.findOne({name: th.name}).exec()
			if (savedTh) {
				savedTh.score = th.score
				await savedTh.save()
			} else {
				await TrendingHashtag.create(th)
			}
		}
	}
}
trendingHashtagSchema.statics.activeHashtags = async () => {
	return await TrendingHashtag.find({ status: TrendingHashtag.statuses.STARTED }).exec()
}
trendingHashtagSchema.statics.statuses = {
	UNUSED: 0,
	STARTED: 1,
	INTERRUPTED: 2,
	DONE: 3,
	REMOVED: 4,
}
trendingHashtagSchema.statics.publicFields = ['createdAt', 'name', 'url', 'score', 'status', 'posts', 'imageUrl']
trendingHashtagSchema.statics.names = {
	singular: "trendingHashtag",
	plural: "trendingHashtags",
}
const TrendingHashtag = base(trendingHashtagSchema)
module.exports = TrendingHashtag
