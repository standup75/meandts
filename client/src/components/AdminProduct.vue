<template>
	<div class="admin-product">
		<div class="left">
			<img :src="product.colors[0].frontUrl" />
		</div>
		<div class="right">
			<div class="name">{{product.name}} - {{getPrices()}}</div>
			<div class="description">
				<div v-for="d in product.description" :key="d">{{d}}</div>
			</div>
			<div class="colors">
				<div v-for="(c, index) in product.colors" :key="index" :style="{backgroundColor: `#${c.hex}`}"></div>
			</div>
			<div class="field category">
				<transition name="fade">
					<label v-if="product.category">Category</label>
				</transition>
				<input type="text" v-model="product.category" placeholder="Category" />
				<button @click="updateCategory">update</button>
			</div>
			<div class="field" @click="togglePublish()">
				<nice-check :checked="product.published" />
				Published
			</div>
			<div class="field">
				<button @click="select(product)">Pick mockups</button>
				<div class="no-mockups" v-if="!product.mockups.length">No mockups for this product</div>
				<div class="mockups">
					<div
						v-for="mockup in product.mockups"
						:key="mockup.smartmockupId"
					>
						<img :src="mockup.url" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import NiceCheck from '@/components/NiceCheck'
import { httpPut } from '@/lib/http'
import { capitalize } from '@/lib/utils'
let debounceTimer
export default {
	name: 'admin-product',
	components: { NiceCheck },
	props: [ 'product', 'select' ],
	methods: {
		updateCategory() {
			this.product.category = capitalize(this.product.category)
			this.$forceUpdate()
			this.update()
		},
		update() {
			clearTimeout(debounceTimer)
			debounceTimer = setTimeout(() => {
				httpPut(`products/${this.product.id}`, this.product)
			}, 200)
		},
		togglePublish() {
			if (!this.product.published && !this.product.mockups.length) {
				this.$toasted.error('Please pick a mockup before publishing')
				return
			}
			this.product.published = !this.product.published
			this.$forceUpdate()
			this.update()
		},
		getPrices() {
			if (this.product.minCost === this.product.maxCost) {
				return `$${this.product.minCost}`
			} else {
				return `$${this.product.minCost} - $${this.product.maxCost}`
			}
		},
	}
}
</script>
<style lang="scss" scoped>
.admin-product {
	padding: 15px;
	overflow: hidden;
	width: 100%;
	max-width: 900px;
	margin: 10px auto;
}
.description {
	font-size: 10px;
}
.left {
	float: left;
	box-sizing: border-box;
	width: 30%;
	padding: 10px;
	img {
		width: 100%;
	}
}
.right {
	float: left;
	box-sizing: border-box;
	width: 70%;
	padding: 10px;
	.field {
		input {
			font-size: 14px;
			margin: 0;
			padding: 5px;
			width: 250px;
		}
	}
}
.colors {
	padding: 10px 0;
	overflow: hidden;
	div {
		display: inline-block;
		width: 20px;
		height: 20px;
		border-radius: 10px;
		margin: 5px;
	}
}
.mockups {
	margin: 10px 0;
	overflow: hidden;
	img {
		float: left;
		height: 50px;
	}
}
.category {
	button {
		padding: 5px 10px;
		margin-left: 5px;
		font-size: 12px;
		text-transform: uppercase;
	}
}
</style>