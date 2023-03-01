<template>
	<div class="full-image-component">
		<img :src="src" ref="img" @click="select" class="thumb" />
		<div v-if='isFullScreen' class="fullscreen" @click="isFullScreen = false">
			<div class="label">{{confirm}}</div>
			<div class="actions">
				<div class="sw-check" @click="$emit('select', src)"/>
				<div class="sw-x" />
			</div>
			<img :src="src" ref="img"/>
		</div>
	</div>
</template>
<script>
export default {
	name: 'full-image-component',
	props: [ 'src', 'confirm', 'mode' ],
	data() {
		return {
			isFullScreen: false,
		}
	},
	mounted() {
		const imgEl = this.$refs.img
		const parentEl = this.$el.parentElement
		imgEl.onload = () => {
			this.$emit('loaded')
			const br = parentEl.getBoundingClientRect()
			if (window.innerWidth > 500 ) {
				const imgRatio = imgEl.width / imgEl.height
				if (this.mode === 'fit') {
					if (imgRatio > 1) {
						imgEl.style.width = `${br.width}px`
						imgEl.style.marginTop = `${br.height * (1 - 1/imgRatio) / 2}px`
					} else {
						imgEl.style.height = `${br.height}px`
						imgEl.style.marginLeft = `${br.width * (1 - imgRatio) / 2}px`
					}
				} else {
					if (imgRatio > 1) {
						imgEl.style.height = `${br.height}px`
						imgEl.style.marginLeft = `${br.width * (1 - imgRatio) / 2}px`
					} else {
						imgEl.style.width = `${br.width}px`
						imgEl.style.marginTop = `${br.height * (1 - 1/imgRatio) / 2}px`
					}
				}
			} else {
				imgEl.style.width = `100%`
			}
		}
	},
	methods: {
		select() {
			if (this.confirm) {
				this.isFullScreen = true
			} else {
				this.$emit('select', this.src)
			}
		},
	},
}
</script>
<style lang="scss" scoped>
	.full-image-component {
		overflow: hidden;
	}
	.thumb {
		float: left;
	}
	.fullscreen {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 10000;
		background: rgba(0, 0, 0, 0.8);
		overflow: auto;
		text-align: center;
		.label {
			font-size: 20px;
			color: #fff;
			margin: 10px 0;
		}
		.actions {
			position: relative;
			width: 161px;
			z-index: 10;
			margin: 0 auto;
			div {
				float: left;
				margin: 0 10px;
				padding: 10px;
				border-radius: 50px;
				font-size: 40px;
				cursor: pointer;
			}
			.sw-check {
				background: #050;
				color: #dfd;
			}
			.sw-x {
				background: #500;
				color: #fdd;
			}
		}
		img {
			width: calc(100% - 40px);
			max-width: 800px;
			margin: -20px 0 20px;
		}
	}
</style>
