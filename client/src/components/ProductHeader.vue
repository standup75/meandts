<template>
	<div class="product-header-component">
		<div class="name">{{product.name}}</div>
		<div class="price" v-if="!hidePrice">{{getPrices()}}</div>
		<div class="description">
			<div class="description-toggle" @click="showDescription = true" v-if="!showDescription">show description</div>
			<div v-if="showDescription">
				<div class="description-toggle" @click="showDescription = false">hide description</div>
				<div v-for="d in product.description" :key="d">{{d}}</div>
			</div>
		</div>
	</div>
</template>
<script>
import { computeSellPrice } from '@/lib/utils'
export default {
	name: 'product-header-component',
	props: [ 'product', 'hidePrice' ],
	data() {
		return {
			showDescription: false,
		}
	},
	methods: {
		getPrices() {
			if (this.product.minCost === this.product.maxCost) {
				return `$${computeSellPrice(this.product.minCost)}`
			} else {
				return `$${computeSellPrice(this.product.minCost)} - $${computeSellPrice(this.product.maxCost)}`
			}
		},
	},
}
</script>
<style lang="scss" scoped>
.description {
	padding-top: 10px;
	font-size: 10px;
}
.name {
	font-weight: bold;
	padding: 40px 0 0 0;
}
.price {
	font-size: 14px;
}
.description-toggle {
	text-transform: uppercase;
	font-size: 10px;
	padding: 3px 0;
	color: #33a;
	font-weight: bold;
	letter-spacing: 1px;
	cursor: pointer;
	&:hover {
		text-decoration: underline;
	}
}
</style>