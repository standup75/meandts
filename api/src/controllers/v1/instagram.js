const http = require('src/lib/http')

module.exports = {
	async getToken(req, res) {
		// res.status(200).json({access_token: 'pipo'})
		if (!req.query.code) {
			res.status(406).json({error: 'query param code missing'})
			return
		}
		const response = await http.post(`${process.env.INSTAGRAM_API_URL}/oauth/access_token`, {
			code: req.query.code,
			client_secret: process.env.INSTAGRAM_APP_SECRET,
			client_id: process.env.INSTAGRAM_APP_ID,
			grant_type: 'authorization_code',
			redirect_uri: 'https://meandts.com/',
		}, {
			formData: true,
			parseJson: true,
		})
		res.status(200).json(response)
	},
	async getMedia(req, res) {
		// res.status(200).json({"pictureUrls":["https://scontent.xx.fbcdn.net/v/t51.2885-15/81687038_211603486545565_6242284445928139375_n.jpg?_nc_cat=105&_nc_ohc=aFexbgacTusAX9_VD7-&_nc_ht=scontent.xx&oh=0343a902e644d2c66e247ba306e2c7d3&oe=5E7A7F69","https://scontent.xx.fbcdn.net/v/t51.2885-15/72366874_1470371683087154_3423743521789540995_n.jpg?_nc_cat=108&_nc_ohc=k21BqRI3JHEAX_0BIDY&_nc_ht=scontent.xx&oh=977126c7cf246c66df51c5c4a67a8b57&oe=5E786E8E","https://scontent.xx.fbcdn.net/v/t51.2885-15/75372365_154910269209177_1201194105747854365_n.jpg?_nc_cat=111&_nc_ohc=AwKeRI2ChhAAX9vloJ_&_nc_ht=scontent.xx&oh=8000573762ddf785615ad0b1741f0fef&oe=5E73DA73","https://scontent.xx.fbcdn.net/v/t51.2885-15/75489898_184862559303802_5874113664210794695_n.jpg?_nc_cat=100&_nc_ohc=eTrVZml6YRsAX_3FGo6&_nc_ht=scontent.xx&oh=655cd80f83f576d895cf603c0d6616a5&oe=5E743B69","https://scontent.xx.fbcdn.net/v/t51.2885-15/74642751_2555641607861729_5616986778928483191_n.jpg?_nc_cat=105&_nc_ohc=haU-8mjsmd0AX_j0zNu&_nc_ht=scontent.xx&oh=63cd3beccaaa07eade5b83f2e12a6972&oe=5E771A0E","https://scontent.xx.fbcdn.net/v/t51.2885-15/75196163_2288691567907012_4922879785539140581_n.jpg?_nc_cat=110&_nc_ohc=awXWqlq82ooAX882CN4&_nc_ht=scontent.xx&oh=d1ae94c6ca3dfd975292ebcc20163a8c&oe=5E742B28","https://scontent.xx.fbcdn.net/v/t51.2885-15/67595653_161056318380836_918695717469511172_n.jpg?_nc_cat=107&_nc_ohc=4F8I678AWVcAX9sUsjs&_nc_ht=scontent.xx&oh=82e1bb9edf482c62db8d503d4df0d9b9&oe=5E75657E","https://scontent.xx.fbcdn.net/v/t51.2885-15/67587225_693222704474635_2977700273963429114_n.jpg?_nc_cat=110&_nc_ohc=-OwFJKndgJwAX9vyoaZ&_nc_ht=scontent.xx&oh=3d1e6b87f99b2db7a2d846fd2587e0e1&oe=5E7700B4","https://scontent.xx.fbcdn.net/v/t51.2885-15/67095266_494103257800179_2678191001857326681_n.jpg?_nc_cat=105&_nc_ohc=hcWlMFSdGgUAX_pK590&_nc_ht=scontent.xx&oh=c9fa495b005b6be1d5e1e9b3d9a4c0e1&oe=5E7AF61A","https://scontent.xx.fbcdn.net/v/t51.2885-15/66434772_2091373701166317_9133188096976640902_n.jpg?_nc_cat=103&_nc_ohc=piVH_fqpk0MAX-V5MSG&_nc_ht=scontent.xx&oh=a5ad8310bff1d16c13e61346316cc3f2&oe=5E7BA6F1","https://scontent.xx.fbcdn.net/v/t51.2885-15/62643807_816356022098437_1690435987341218370_n.jpg?_nc_cat=110&_nc_ohc=cKWD4EoZe3MAX96Gtt0&_nc_ht=scontent.xx&oh=40bde8fb20987818e4a0d4d9e181254b&oe=5E787324","https://scontent.xx.fbcdn.net/v/t51.2885-15/62591223_2327753880830384_1290506132107461546_n.jpg?_nc_cat=109&_nc_ohc=c6zmNd1sL7AAX9Ld_1k&_nc_ht=scontent.xx&oh=05114324f9b8cfca09349ad601265253&oe=5E770167","https://scontent.xx.fbcdn.net/v/t51.2885-15/62412363_347243245991616_7722660885149086604_n.jpg?_nc_cat=108&_nc_ohc=HpJmZy_MxqIAX-Yl-3x&_nc_ht=scontent.xx&oh=7edae0077bd4929649ddecb11bbdb658&oe=5E73A524","https://scontent.xx.fbcdn.net/v/t51.2885-15/60857756_619420828557483_3359371374064531892_n.jpg?_nc_cat=106&_nc_ohc=iQAcNXNFYhgAX8cImpB&_nc_ht=scontent.xx&oh=98fbf949bb65ff596cd36974ff593dd1&oe=5E7B5B5A","https://scontent.xx.fbcdn.net/v/t51.2885-15/61352590_1541768709293025_7849239942877946765_n.jpg?_nc_cat=111&_nc_ohc=t0ab8HSx1SMAX9gNhfr&_nc_ht=scontent.xx&oh=8799147e51ffc55535fad31bc350123e&oe=5E7A5135","https://scontent.xx.fbcdn.net/v/t51.2885-15/58410046_2061641417217969_2868956333208543983_n.jpg?_nc_cat=100&_nc_ohc=XKfdpBzAnpAAX_2-h_7&_nc_ht=scontent.xx&oh=0c7c36fd894f0406b2c70c6aa83b98c4&oe=5E7A057A","https://scontent.xx.fbcdn.net/v/t51.2885-15/57422072_633687233710665_3950704070364035401_n.jpg?_nc_cat=110&_nc_ohc=BQy68UnhgKMAX_RoYHi&_nc_ht=scontent.xx&oh=6715f8ed5e798e189aea170bf9938946&oe=5E76F1EB","https://scontent.xx.fbcdn.net/v/t51.2885-15/56697195_2090049834396581_6766280448498050796_n.jpg?_nc_cat=107&_nc_ohc=25SVlkwQASsAX-_OOfV&_nc_ht=scontent.xx&oh=a808174ad32bb49a3527c76f285b9690&oe=5E7764CA","https://scontent.xx.fbcdn.net/v/t51.2885-15/53362611_438231503583143_6742413571832332046_n.jpg?_nc_cat=105&_nc_ohc=RjwrZTWNPEkAX-PsxfA&_nc_ht=scontent.xx&oh=bf14f9727b83e5c98d18cb0f21c0db25&oe=5E7B0389","https://scontent.xx.fbcdn.net/v/t51.2885-15/52909892_564743784022679_5571981968778017782_n.jpg?_nc_cat=108&_nc_ohc=spjWy8AnROoAX99MN_F&_nc_ht=scontent.xx&oh=866e78ab5bcce7f425ef566542853d5e&oe=5E8A65C1","https://scontent.xx.fbcdn.net/v/t51.2885-15/51798105_374198873164283_2658728261352564703_n.jpg?_nc_cat=108&_nc_ohc=WC1OkAlpEfEAX9E8W_Q&_nc_ht=scontent.xx&oh=1cf62b0a9817e65455ca5750e8774efb&oe=5E8B08E1","https://scontent.xx.fbcdn.net/v/t51.2885-15/49933708_2095933870501451_7935784039543567058_n.jpg?_nc_cat=109&_nc_ohc=CBsLMm6egBUAX9Xhpcu&_nc_ht=scontent.xx&oh=685d1cc126ecd584b9ef6548768e1583&oe=5E7AD742","https://scontent.xx.fbcdn.net/v/t51.2885-15/47690571_366504133897475_4303424575779190934_n.jpg?_nc_cat=102&_nc_ohc=tJisMRMwMfcAX-YR6d0&_nc_ht=scontent.xx&oh=94127078d220fbf131ac4834249b268f&oe=5E7BBDCD"],"nextPageUrl":"https://graph.instagram.com/v1.0/17841400344760023/media?access_token=IGQVJYWEcza1VMM0ZA6eUVlOElqU0VhM3Rkc2c1cmF3Y3ZAHRTc0WTAzWkJXNXBhcG5FdkR5dTY0dEtleVozSnpvUnMwTnNxRE9GR2RlM0lqZAFFnNEZAlN3VUaFFDMTlxZAnFsOXh0MDhsLTE5bWF0OTFrU0RSNHhXT2lGNzUw&fields=media_type%2Cmedia_url%2Cpermalink%2Cthumbnail_url&limit=25&after=QVFIUms0YzROWEFlYjZABODQxb0t3NVRLX2NjZAGVTQ1NBbzdxTjlQUkN5NGlpQlJjcmVRcWRzQnBOQTJzTWQ5SnlLQm1KcEpJSFpMQ1RxZAEk3UUVKU20yRE1n"})
		if (!req.query.token) {	
			res.status(406).json({error: 'token param code missing'})
			return
		}
		let url = req.query.url || `${process.env.INSTAGRAM_GRAPH_URL}/me/media?fields=media_type,media_url,permalink,thumbnail_url&access_token=${req.query.token}`
		console.log('--->', url)
		let response = {}
		try {
			response = await http.get(url)
			if (response.error) {
				const accessToken = "IGQVJYMmVVWWljMnlHblRySzF4Q3I5OWI1WVlVaFpucUFwUFkweXZATQ0QteFJSNVd5Mk1uV25vT3FqRmw0UXR2RFdVcUZAzdnBzQTlkMVlBNEkzcnNoenktU0VlTW1lQTg1TmZATdF8yWGphQ2tIY0JJRwZDZD"
				url = `${process.env.INSTAGRAM_GRAPH_URL}/me/media?fields=media_type,media_url,permalink,thumbnail_url&access_token=${accessToken}`
				response = await http.get(url)
			}
		} catch (err) {
			console.log('!!!', err)
		}
		console.log('--->', JSON.stringify(response))
		if (response.data) {
			const pictureUrls = response.data
				.filter(data => data.media_type !== 'VIDEO')
				.map(data => data.media_url)
			res.status(200).json({
				pictureUrls,
				nextPageUrl: response.paging && response.paging.next,
			})
		} else {
			res.sendStatus(500)
		}
	},
}