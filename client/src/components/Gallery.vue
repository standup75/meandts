<template>
	<div class="gallery-component">
		<div :class="{hide: !hasLoaded}">
			<div class="images-container">
				<div v-for="(url, index) in visibleUrls" :key="index" class="img-wrapper">
					<full-image :src="url" @select="select" @loaded="pictureLoaded" :mode="mode" :confirm="confirm"/>
				</div>
			</div>
			<div v-if="hasNextPage" @click="loadMore" class="discret-button">Load More</div>
		</div>
		<div class="loader" v-if="isLoading">
			<div class="count">Loading... {{loadingPercent}}</div>
			<loader v-if="isLoading" />
		</div>
	</div>
</template>
<script>
import FullImage from '@/components/FullImage.vue'
import Loader from '@/components/Loader.vue'

export default {
	name: 'gallery-component',
	props: [ 'loadPage', 'confirm', 'mode' ],
	components: { FullImage, Loader },
	data() {
		return {
			showAll: false,
			hasNextPage: true,
			pictureUrls: [],
			pictureLoadedCount: 0,
			hasLoaded: false,
		}
	},
	computed: {
		visibleUrls() {
			const arr = this.pictureUrls
			if (this.showAll) {
				return arr
			}
			return arr.slice(0, Math.floor(arr.length / 3) * 3)
		},
		canLoadMore() {
			return (this.visibleUrls.length > this.urls.length) || this.hasNextPage
		},
		isLoading() {
			return this.pictureLoadedCount === 0 || this.pictureLoadedCount < this.visibleUrls.length
		},
		loadingPercent() {
			if (this.pictureUrls.length) {
				return `${this.visibleUrls.length && Math.floor(100 * this.pictureLoadedCount / this.visibleUrls.length)}%`
			}
		},
	},
	async created() {
		this.loadMore()
	},
	methods: {
		pictureLoaded() {
			this.pictureLoadedCount++
		},
		select(url) {
			this.$emit('select', url)
		},
		async loadMore() {
			if (this.hasNextPage) {
				try {
					const { pictureUrls, hasNextPage } = await this.loadPage()
					if (pictureUrls) {
						this.pictureUrls = [...this.pictureUrls, ...pictureUrls]
					}
					if (!this.pictureUrls.length) {
						this.$router.push('noimages')
					}
					this.hasNextPage = hasNextPage
					this.hasLoaded = true
				} catch (e) {
					console.error(e)
					this.$toasted.error('Could not get pictures')
					this.$router.push('noimages')
				}
			} else {
				this.showAll = true
			}
		},
	},
}
</script>
<style lang="scss" scoped>
.discret-button {
	margin: 30px auto 0;
}
@media (min-width: 501px) {
	.images-container {
		width: 960px;
		overflow: hidden;
		margin: 0 auto;
	}
	.img-wrapper {
		padding: 5px;
		box-sizing: border-box;
		width: 300px;
		height: 300px;
		padding: 10px;
		float: left;
		overflow: hidden;
	}
}
.hide {
	opacity: 0;
	position: absolute;
	z-index: -1000;
}
.loader {
	position: relative;
	.count {
		position: absolute;
		text-align: center;
		left: 0;
		right: 0;
		top: 28px;
		z-index: 10;
		font-weight: bold;
	}
}
@media (max-width: 500px) {
	.img-wrapper {
		width: calc(100% - 20px);
		padding: 10px;
	}
}
</style>