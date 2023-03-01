<template>
	<div class="product-explorer">
		<admin-menu />
		<loader v-if="isLoading" />
		<div class="list" v-if="!isLoading">
			<div class="filters">
				<div class="published-only" @click="publishedOnly = !publishedOnly">
					<nice-check :checked="publishedOnly" />
					Show published products only
				</div>
				<div v-for="category in categories" :key="category.name" @click="toggleCategory(category.name)">
					<nice-check :checked="selectedCategories.includes(category.name)" />
					{{category.name}} ({{category.publishedCount}} / {{category.count}}) {{getPrice(category)}}
				</div>
			</div>
			<div v-for="product in filteredProducts" :key="product.id" class="product">
				<admin-product :product="product" :select="selectProduct" />
			</div>
		</div>
		<select-mockups v-if="currentProduct" :product="currentProduct" :mockups="smartmockupProducts" :close="closeMockupPanel"/>
	</div>
</template>
<script>
import { httpGet } from '@/lib/http'
import { getCategories } from '@/lib/utils'
import Loader from '@/components/Loader'
import NiceCheck from '@/components/NiceCheck'
import AdminMenu from '@/components/AdminMenu'
import AdminProduct from '@/components/AdminProduct'
import SelectMockups from '@/components/SelectMockups'

export default {
	name: 'product-explorer',
	components: { Loader, AdminMenu, AdminProduct, NiceCheck, SelectMockups },
	data() {
		return {
			isLoading: true,
			publishedOnly: false,
			currentProduct: null,
			products: [],
			categories: [],
			selectedCategories: [],
		}
	},
	computed: {
		filteredProducts() {
			let products = this.publishedOnly ? this.products.filter(p => p.published) : this.products
			if (this.selectedCategories.length) {
				products = products.filter(p => this.selectedCategories.includes(p.category))
			}
			return products.sort((a, b) => a.minCost - b.minCost)
		},
	},
	async created() {
		this.products = (await httpGet('products')).products
		this.smartmockupProducts = (await httpGet('products/smartmockup')).products
		this.categories = getCategories(this.products)
		this.isLoading = false
	},
	methods: {
		getPrice(product) {
			if (product.minCost === product.maxCost) {
				return `$${product.minCost}`
			} else {
				return `$${product.minCost} - $${product.maxCost}`
			}
		},
		toggleCategory(categoryName) {
			if (this.selectedCategories.includes(categoryName)) {
				this.selectedCategories = this.selectedCategories.filter(name => categoryName !== name)
			} else {
				this.selectedCategories.push(categoryName)
			}
		},
		selectProduct(product) {
			this.currentProduct = product
		},
		closeMockupPanel(product) {
			this.products = this.products.map(p => {
				if (p.id === product.id) {
					return product
				} else {
					return p
				}
			})
			this.currentProduct = null
		}
	},
}
</script>
<style lang="scss" scoped>
.product-explorer {
	padding-bottom: 30px;
	width: 100%;
}
.filters {
	border-bottom: 1px solid #eee;
	padding: 15px 0;
	margin-bottom: 10px;
}

</style>