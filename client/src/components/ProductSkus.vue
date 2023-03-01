<template>
	<div class="product-skus">
		<product-header :product="product" />
		<div class="colors">
			<div
				v-for="c in productColors"
				:key="c.hex"
				:style="{backgroundColor: `#${c.hex}`}"
				@click="pickColor(c)"
				:class="{selected: currentColor.hex === c.hex}"></div>
		</div>
		<div class="images" @click="select()">
			<div class="preview-callout">Preview Your Design</div>
			<img :src="currentColor.frontUrl" v-if="showFront" />
			<img :src="currentColor.backUrl" v-if="!showFront" />
		</div>
	</div>
</template>
<script>
import ProductHeader from '@/components/ProductHeader'
export default {
	name: 'product-skus',
	props: [ 'product' ],
	components: { ProductHeader },
	data() {
		return {
			showFront: true,
			currentColor: null,
			showDescription: false,
		}
	},
	computed: {
		productColors() {
			return this.product.colors.filter(c => c.inStock)
		},
	},
	created() {
		this.currentColor = this.productColors[0]
	},
	methods: {
		pickColor(c) {
			this.currentColor = c
		},
		select() {
			this.$emit('select', { metadata: this.product, color: this.currentColor })
		},
	}
}
</script>
<style lang="scss" scoped>
.colors {
	padding: 10px 0;
	overflow: hidden;
	div {
		display: inline-block;
		width: 30px;
		height: 30px;
		border-radius: 30px;
		margin: 2px;
		border: 2px solid #fff;
		&.selected {
			border: 2px solid #333;
		}
	}
}
.images {
	position: relative;
	cursor: pointer;
	.preview-callout {
		box-sizing: border-box;
		position: absolute;
		top: 130px;
		left: calc(50% - 90px);
		width: 180px;
		font-weight: bold;
		text-transform: uppercase;
		background: rgba(255, 255, 255, 0.5);
		border-radius: 30px;
		padding: 30px 10px;
		font-size: 24px;
		font-style: italic;
	}
	box-sizing: border-box;
	padding: 0 15px;
	&, img {
		max-width: 100%;
	}
}
</style>