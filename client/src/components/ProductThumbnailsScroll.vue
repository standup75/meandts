<template>
  <div class="product-thumbnails-scroll-component">
		<div class="slideshow" ref="container">
			<ul :style="{width: `${containerWidth}px`}">
				<li
					v-for="thumbnail in thumbnails"
					:key="thumbnail.id"
					@click="select(thumbnail)"
					:class="{selected: thumbnail.id === selectedId}"
				>
					<img :src="thumbnail.url" class="thumb"/>
				</li>
			</ul>
	  </div>
  </div>
</template>

<script>
import { httpGet } from '@/lib/http'
const INIT_WIDTH = 10000
const IMAGE_MARGIN = 20
export default {
  name: 'ProductThmbnails',
  props: {
    select: Function,
		selectedId: String,
  },
	data() {
		return {
			thumbnails: null,
			isScrollInit: false,
			containerWidth: INIT_WIDTH,
		}
	},
	async mounted() {
		const response = await httpGet('products')
		this.thumbnails = response.products
		this.$refs.container && this.$refs.container.addEventListener('scroll', this.scroll)
	},
	destroyed() {
		this.$refs.container && this.$refs.container.removeEventListener('scroll', this.scroll)
	},
	methods: {
		scroll() {
			if (this.containerWidth === INIT_WIDTH) {
				const thumbs = this.$refs.container.getElementsByClassName('thumb')
				let width = 0
				for (const thumb of thumbs) {
					if (thumb.width) {
						width += thumb.width + 2 * IMAGE_MARGIN
					} else {
						console.log(thumb)
						return
					}
				}
				this.containerWidth = width
			}

		},
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@media (min-width: 501px) {
	.slideshow {
		height: 290px;
		overflow: auto;
	}
	ul {
		overflow: hidden;
		width: 10000px;
		list-style-type: none;
		padding: 0;
		margin: 0;
	}
	li {
		display: block;
		float: left;
		margin: 10px;
		padding: 10px;
		height: 250px;
		img {
			height: 250px;
		}
		&.selected {
			margin: 7px;
			border: 3px solid #ffaa55;
			border-radius: 9px;
		}
	}
}
@media (max-width: 500px) {
}
</style>
