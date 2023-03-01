<template>
  <div class="product-thumbnails-component">
		<loader v-if="isLoading" />
		<div class="list" v-if="!isLoading">
			<div class="filters">
				<drop-down :select="selectCategory" :options="filterOptions" :selectedOption="selectedCategory" />
			</div>
			<div v-for="product in filteredProducts" :key="product.id" class="product">
				<product-skus :product="product" @select="select" />
			</div>
		</div>

  </div>
</template>

<script>
import ProductSkus from '@/components/ProductSkus'
import NiceCheck from '@/components/NiceCheck'
import DropDown from '@/components/DropDown'
import Loader from '@/components/Loader'
import { httpGet } from '@/lib/http'
import { getCategories, computeSellPrice } from '@/lib/utils'
const INIT_WIDTH = 10000
const IMAGE_MARGIN = 20
export default {
	name: 'product-thumbnails-component',
	components: { ProductSkus, Loader, NiceCheck, DropDown },
	computed: {
		filteredProducts() {
			let products = this.products
			if (this.selectedCategory) {
				products = products.filter(p => this.selectedCategory === p.category)
			}
			return products.sort((a, b) => b.minCost - a.minCost)
		},
	},
	data() {
		return {
			products: null,
			isLoading: true,
			categories: null,
			selectedCategory: null,
			filterOptions: [
				{ label: 'Choose a product category', value: null },
			],
		}
	},
	async created() {
		const response = await httpGet('products')
		this.products = response.products.filter(p => p.published && p.inStock)
		const categories = getCategories(this.products, true)
		for (const category of categories) {
			this.filterOptions.push({
				value: category.name,
				label: `${category.name} <span class="sub">${getPrice(category)}</span>`,
			})
		}
		this.isLoading = false
	},
	methods: {
		selectCategory(option) {
			this.selectedCategory = option.value
		},
		select({ metadata, color }) {
			this.$emit('select', { metadata, color })
		},
	},
}

function getPrice(category) {
	return `$${computeSellPrice(category.minCost)}${category.minCost === category.maxCost ? '' : '+'}`
}

</script>
<style lang="scss" scoped>
.filters {
	width: 700px;
	max-width: 100%;
	margin: 0 auto;
}
</style>