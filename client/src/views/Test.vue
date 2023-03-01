<template>
	<div class="test-component">
		<preview-maker>
			<Gallery @select="setDesignUrl" :load-page="loadPage" confirm="Is that the picture you want to print?"/>
		</preview-maker>
	</div>
</template>
<script>
import Gallery from '@/components/Gallery.vue'
import PreviewMaker from '@/components/PreviewMaker.vue'

export default {
	name: 'test-component',
	components: { PreviewMaker, Gallery },
	methods: {
		setDesignUrl(url) {
			this.$store.commit('setDesignUrl', url)
		},
		loadPage() {
			const pictureUrls = []
			for (let i = 0; i < 20; i++) {
				const isSquare = Math.floor(Math.random()*1.2)
				const width = 1440
				let height
				if (isSquare) {
					height = 1440
				} else {
					height = Math.floor(width * (0.5 + Math.random()))
				}
				pictureUrls.push(`https://loremflickr.com/${width}/${height}`)
			}
			return Promise.resolve({
				pictureUrls,
				hasNextPage: false,
			})
		},
	},
}
</script>
<style lang="scss" scoped>

</style>