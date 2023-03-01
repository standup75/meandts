<template>
	<div class="product-component">
		<steps :current="2" />
		<product-header :product="product.metadata" :hide-price="true" />
		<preview-image @refuse="resetPreview" :src="previewUrl" />
		<div class="disclaimer">For illustration purpose only. Actual product may vary.</div>
		<div class="sku-container">
			<div class="skus">
				<div
					v-for="sku in skus"
					:key="sku.skuId"
					class="sku"
					@click="skuId = sku.skuId"
					:class="{active: skuId === sku.skuId}"
				>{{sku.size}}</div>
			</div>
		</div>
		<div class="quantity">
			<span class="title">Quantity</span>
			<input type="number" v-model="quantity" class="input" min="1" max="99" />
		</div>
		<div class="total-price">Price:
			<span v-if="hasMultiplePrices">Choose size first</span>
			<span v-if="!hasMultiplePrices">${{totalPrice}}</span>
		</div>
		<contact-form />
		<shipping-form />
		<payment :amount="totalPrice" class="checkout"/>
	</div>
</template>

<script>
import ProductHeader from "@/components/ProductHeader.vue";
import ContactForm from "@/components/ContactForm.vue";
import ShippingForm from "@/components/ShippingForm.vue";
import Payment from "@/components/Payment.vue";
import PreviewImage from "@/components/PreviewImage.vue";
import Steps from "@/components/Steps.vue";
import { httpGet, httpPost } from '@/lib/http'
import { computeSellPrice } from '@/lib/utils'

export default {
	name: 'product-component',
	components: { ContactForm, ShippingForm, Payment, PreviewImage, Steps, ProductHeader },
	computed: {
		skuId: {
			get() {
				return this.$store.state.skuId
			},
			set(skuId) {
				this.$store.commit('setSkuId', skuId)
			},
		},
		quantity: {
			get() {
				return this.$store.state.quantity
			},
			set(quantity) {
				this.$store.commit('setQuantity', quantity)
			},
		},
		previewUrl() {
			return this.$store.state.previewUrl
		},
		product() {
			return this.$store.state.product
		},
		sellPrice() {
			if (!this.product) return 0
			if (this.skuId) {
				return computeSellPrice(this.product.color.skus.find(s => s.skuId === this.skuId).cost)
			} else {
				const prices = this.product.color.skus.map(s => s.cost)
				return computeSellPrice(Math.min(...prices))
			}
		},
		hasMultiplePrices() {
			if (!this.product || this.skuId) {
				return false
			}
			const prices = this.product.color.skus.map(s => s.cost)
			const min = computeSellPrice(Math.min(...prices))
			const max = computeSellPrice(Math.max(...prices))
			return min !== max
		},
		totalPrice() {
			return this.sellPrice && this.sellPrice * this.quantity
		},
		skus() {
			if (this.product && this.product.color.skus && this.product.color.skus.length > 1) {
				return this.product.color.skus.filter(s => s.inStock)
			} else {
				return []
			}
		}
	},
	async created() {
		if (this.$route.query.hashtag) {
			this.$store.commit('setStepsLabels', ['Choose a hashtag', 'Pick a product', 'Order'])
		} else {
			this.$store.commit('setStepsLabels', ['Choose a design', 'Pick a product', 'Order'])
		}
		if (this.$route.query.hashtag && this.$route.query.previewUrl && this.$route.query.productId) {
			const response = await httpGet("products")
			const metadata = response.products.find(p => p.id === this.$route.query.productId)
			const th = await httpGet(`trendingHashtags/${encodeURIComponent(this.$route.query.hashtag)}`)
			let color
			if (this.$route.query.color) {
				color = metadata.colors.find(c => c.hex === this.$route.query.color)
			} else {
				color = metadata.colors.find(c => c.name.startsWith('White'))
			}
      if (product && th) {
        this.$store.commit('setProduct', { metadata, color })
        this.$store.commit('setPreviewUrl', this.$route.query.previewUrl)
        this.$store.commit('setDesignUrl', th.imageUrl)
        this.$store.commit('setIsTwitter', true)
				this.$store.commit('setTextToPrint', this.$route.query.hashtag)
      }
    }
		if (!this.previewUrl || !this.product) {
			this.$router.push('/')
			this.$toasted.error('Failed to make the preview, please try again')
			return
		}
	},
	methods: {
		resetPreview() {
			this.$store.commit('setProduct', null)
			this.$store.commit('setPreviewUrl', null)
			if (this.$store.state.textToPrint) {
				this.$router.push('hashtag')
			} else {
				this.$router.push('/')
			}
		},
	},
}
</script>
<style scoped lang="scss">
.input {
	font-size: 30px;
	background: #F4F0EC;
	padding: 17px;
	margin: 30px 10px;
	border: 1px solid #fffaf0;
}
.quantity {
	position: relative;
	width: 100px;
	margin: 0 auto;
	.title {
		position: absolute;
		top: 27px;
		left: 15px;
		font-size: 10px;
		text-transform: uppercase;
		font-style: italic;
		color: #888;
	}
	input {
		box-sizing: border-box;
		width: 100px;
		margin: 15px 0;
	}
}
.total-price {
	margin: 10px 0;
	font-size: 30px;
}
.product-name {
	height: 30px;
	font-size: 20px;
	text-align: center;
	margin-top: 10px;
}
.sku-container {
	text-align: center;
	.skus {
		display: inline-block;
		overflow: hidden;
		.sku {
			float: left;
			margin: 10px;
			padding: 10px;
			font-size: 22px;
			width: 34px;
			text-align: center;
			&.active {
				border-radius: 20px;
				background: #888;
				color: #fff;
			}
		}
	}
}
.disclaimer {
	font-size: 10px;
	margin: -15px 0 15px 0;
	opacity: 0.6;
}
@media (max-width: 500px) {
	.product-name {
		height: 22px;
		font-size: 14px;
	}
	.sku-container .skus .sku {
		margin: 4px;
		padding: 5px;
		font-size: 20px;
	}
}

</style>