<template>
	<div class="select-mockups-component">
		<div class="container">
			<div v-for="mockup of mockups" :key="mockup.smartMockupId" @click="toggleMockup(mockup)" class="mockup">
				<div class="sw-check" v-if="productMockupIds.includes(mockup.id)"></div>
				<img :src="mockup.url" />
			</div>
		</div>
		<div class="close" @click="close(product)"><div class="sw-x"></div></div>
	</div>
</template>
<script>
import { httpPut } from '@/lib/http'
let debounceTimer
export default {
	name: 'select-mockups-component',
	props: [ 'product', 'mockups', 'close'],
	computed: {
		productMockupIds() {
			return (this.product.mockups || []).map(m => m.id)
		},
	},
	methods: {
		toggleMockup(mockup) {
			this.product.mockups = this.product.mockups || []
			if (this.productMockupIds.includes(mockup.id)) {
				this.product.mockups = this.product.mockups.filter(m => m.id !== mockup.id)
			} else {
				this.product.mockups.push(mockup)
			}
			this.$forceUpdate()
			this.update()
		},
		update() {
			clearTimeout(debounceTimer)
			debounceTimer = setTimeout(() => {
				httpPut(`products/${this.product.id}`, this.product)
			}, 200)
		},
	},
}
</script>
<style lang="scss" scoped>
	.select-mockups-component {
		position: fixed;
		top: 100px;
		bottom: 100px;
		left: 100px;
		right: 100px;
		padding: 15px;
		background: #333;
	}
	.container {
		height: 100%;
		width: 420px;
		margin: 0 auto;
		overflow: auto;
	}
	.mockup {
		position: relative;
		margin: 0 20px;
		.sw-check	{
			position: absolute;
			top: 0;
			left: 0;
			font-size: 80px;
			color: #afa;
		}
		img {
			width: 400px;
		}
	}
	.close {
		position: absolute;
		top: -15px;
		right: -15px;
		width: 30px;
		height: 30px;
		border-radius: 30px;
		cursor: pointer;
		background: #333;
		padding: 10px;
		.sw-x {
			font-size: 30px;
			color: #fff;
		}
	}
</style>