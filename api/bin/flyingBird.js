require('rootpath')()
const runner = require('./lib/runner')
const log = require('./lib/log')
const TrendingHashtag = require('src/models/trendingHashtag')
const Product = require('src/models/product')
const Mockup = require('src/models/mockup')
const twitter = require('src/lib/twitter')
const contents = [
	'Look! This just came out. We just printed 50 of these #hashtag t\'s. VERY limited edition, obviously...',
	'I love #hashtag. Now I can git it out of my screen. Get this limited edition now.',
	'Let\'s take #hashtag to the streets! Don\'t wait. We always run out fast',
	'If you care about #hashtag, you\'ll care about supporting the cause. Get it now.',
	'More #hashtag! Spread the word, get it now on this awesome #category!',
	'And boom, we already have the #hashtag #category. Get it now!',
	'You dreamt about it, and me too, so here it is: New #hashtag #category. High quality, low price guarantee',
	'What? Already a #category with #hashtag? I need it! Click the link ->',
	'High quality #hashtag #categorys at a very good price. Check it out.',
	'Did you ever wonder how you could get a #category with your favorite hashtag on it. We did it.',
]

runner(async () => {
	const hashtagsToPost = await TrendingHashtag.activeHashtags()
	for (const th of hashtagsToPost) {
		await initPosts(th)
		const possiblePosts = th.posts.filter(p => !p.recycled)
		if (!possiblePosts.length) {
			th.status = TrendingHashtag.statuses.DONE
			th.posts = th.posts.map(p => {
				p.recycled = false
				return p
			})
		} else {
			const postIndex = Math.floor(Math.random() * possiblePosts.length)
			const post = possiblePosts[postIndex]
			const product = await Product.findById(post.product)
			post.recycled = true
			if (!post.previewUrl) {
				post.previewUrl = await Product.getPreviewUrl(post.product, null, th.imageUrl, 100)
				post.mediaId = await twitter.upload(post.previewUrl)
			}
			if (post.previewUrl) {
				const url = `https://meandts.com/product?hashtag=${encodeURIComponent(th.name)}&previewUrl=${encodeURIComponent(post.previewUrl)}&productId=${post.product}`
				const content = contents[Math.floor(Math.random() * contents.length)].replace(/#hashtag/g, th.name).replace(/#category/g, product.category)
				await twitter.post(`${content} ${url}`, { media_ids: post.mediaId })
				log.write(`${content} ${url} => sent`)
			} else {
				log.write(`something went wrong while trying to buld preview for product ${product.name} with hashtag ${th.name}`, { color: 'red' })
			}
		}
		await th.save()
	}
})

async function initPosts(th) {
	if (th.posts && th.posts.length) {
		return
	}
	const products = await Product.find().lean().exec()
	th.posts = products.map(product => ({
		product,
		createdAt: new Date,
		recycled: false,
	}))
}
