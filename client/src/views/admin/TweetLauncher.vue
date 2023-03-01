<template>
	<div class="tweet-launcher-component">
		<admin-menu />
		<h1>Twitter Hashtags</h1>
		<loader v-if="isLoading" />
		<div class="list" v-if="!isLoading">
			<div class="row">
				<div class="table-header">Hashtag</div>
				<div class="table-header">Score</div>
				<div class="table-header">Status</div>
				<div class="table-header">Action</div>
				<div class="table-header">Posted</div>
				<div class="table-header"></div>
			</div>
			<div v-for="th in trendingHashtags" :key="th.id" class="row">
				<div class="name"><a :href="th.url" target=_blank>{{th.name}}</a></div>
				<div class="score">{{th.score}}</div>
				<div class="status">{{statuses[th.status]}}</div>
				<div class="action" :class="{loading: thsLoading.indexOf(th.id) > -1}">
					<div class="button" v-if="th.status !== 1" @click="start(th)">Start</div>
					<div class="button stop" v-if="th.status === 1" @click="stop(th)">Stop</div>
				</div>
				<div class="posted">
					<div class="post" v-for="(post, index) in th.posts" :key="post.previewUrl">
						<a v-if="post.recycled" :href="post.previewUrl" target=_blank>{{index}}</a>
						<span v-if="!post.recycled">{{index}}</span>
					</div>
				</div>
				<div class="action">
					<div class="button remove" @click="remove(th)">X</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { httpGet, httpPost, httpDelete } from '@/lib/http'
import Loader from '@/components/Loader'
import AdminMenu from '@/components/AdminMenu'
import { getImageUrl } from '@/lib/graphicTools'

export default {
	name: 'tweet-launcher-component',
	components: { Loader, AdminMenu },
	data() {
		return {
			trendingHashtags: null,
			isLoading: true,
			statuses: ['Unused', 'Started', 'Interrupted', 'Done'],
			thsLoading: [],
		}
	},
	async created() {
		const response = await httpGet('trendingHashtags')
		this.trendingHashtags = response.trendingHashtags
		this.isLoading = false
	},
	methods: {
		async start(th) {
			if (this.thsLoading.indexOf(th.id) === -1) this.thsLoading = [...this.thsLoading, th.id]
			const params = {}
			if (th.status === 0) {
				params.imageUrl = await getImageUrl(th.name, 'magical-mystery-tour')
			}
			await httpPost(`trendingHashtags/${th.id}/start`, params)
			this.trendingHashtags = this.trendingHashtags.map(t => {
				if (t.id === th.id) {
					th.status = 1
				}
				return t
			})
			this.thsLoading = this.thsLoading.filter(t => t.id === th.id)
		},
		async stop(th) {
			await httpPost(`trendingHashtags/${th.id}/stop`)
			this.trendingHashtags = this.trendingHashtags.map(t => {
				if (t.id === th.id) {
					th.status = 2
				}
				return t
			})
		},
		async remove(th) {
			await httpDelete(`trendingHashtags/${th.id}`)
			this.trendingHashtags = this.trendingHashtags.filter(t => t.id !== th.id)
		},
	}
}
</script>
<style lang="scss" scoped>
.tweet-launcher-component {
	padding-bottom: 30px;
}
.list {
	display: table;
	width: 800px;
	max-width: 100%;
	margin: 0 auto;
	text-align: left;
}
.row {
	display: table-row;
}
.name, .score, .status, .action, .table-header, .posted {
	display: table-cell;
}
.posted {
	a {
		display: inline-block;
		margin-left: 3px;
	}
}
.table-header {
	text-transform: uppercase;
	font-weight: bold;
	color: #aaa;
	letter-spacing: 1px;
	font-size: 10px;
	line-height: 30px;
	height: 30px;
	border-bottom: 1px solid #eee;
}
.post {
	display: inline;
	span {
		color: #bbb;
	}
}
.button {
	font-size: 20px;
	background: #F4F0EC;
	border: 1px solid #fffaf0;
	padding: 7px 15px;
	margin: 5px;
	border-radius: 2px;
	width: 100px;
	text-align: center;
	cursor: pointer;
	&:hover {
		background: #555;
		color: #fff;
	}
	&.stop {
		background: #fee;
		&:hover {
			background: #744;
		}
	}
	&.loading {
		opacity: 0.2;
	}
	&.remove {
		width: 10px;
		margin-left: 10px;
		background: #a44;
		color: #fff;
		font-weight: bold;
		font-size: 10px;
		border-radius: 16px;
		padding: 3px 5px;
	}
}
</style>