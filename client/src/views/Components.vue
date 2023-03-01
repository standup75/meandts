<template>
	<div class="components-component">
		<div class="contact-form">
			<h1 @click="select('ContactForm')">ContactForm</h1>
			<contact-form v-if="currentComponent==='ContactForm'"/>
		</div>
		<div class="steps">
			<h1 @click="select('Steps')">Steps</h1>
			<steps :current="1" v-if="currentComponent==='Steps'" />
		</div>
		<div class="country-select">
			<h1 @click="select('CountrySelect')">CountrySelect</h1>
			<country-select v-if="currentComponent==='CountrySelect'" />
		</div>
		<div class="full-image">
			<h1 @click="select('FullImage')">FullImage</h1>
			<full-image :select="fullImageSelect" :src="fullImageSrc" v-if="currentComponent==='FullImage'" />
		</div>
		<div class="gallery">
			<h1 @click="select('Gallery')">Gallery</h1>
			<gallery @select="gallerySelect" :load-page="galleryLoadPage" confirm="Is that the picture you want to print?" v-if="currentComponent==='Gallery'"/>
		</div>
		<div class="instagram-connect">
			<h1 @click="select('InstagramConnect')">InstagramConnect</h1>
			<instagram-connect v-if="currentComponent==='InstagramConnect'" />
		</div>
		<div class="loader">
			<h1 @click="select('Loader')">Loader</h1>
			<loader v-if="currentComponent==='Loader'" />
		</div>
		<div class="product-gallery">
			<h1 @click="select('ProductGallery')">ProductGallery</h1>
			<product-gallery @select="productGallerySelect" v-if="currentComponent==='ProductGallery'" />
		</div>
		<div class="product-thumbnails-scroll">
			<h1 @click="select('ProductThumbnailsScroll')">ProductThumbnailsScroll</h1>
			<product-thumbnails-scroll :select="productThumbnailsScrollSelect" :selected-id="productThumbnailsScrollId" v-if="currentComponent==='ProductThumbnailsScroll'" />
		</div>
		<div class="product-thumbnails-smart-mockup">
			<h1 @click="select('ProductThumbnailsSmartMockup')">ProductThumbnailsSmartMockup</h1>
			<product-thumbnails-smart-mockup :select="productThumbnailsSmartMockupSelect" :selected-id="productThumbnailsSmartMockupId" v-if="currentComponent==='ProductThumbnailsSmartMockup'" />
		</div>
		<div class="product-thumbnails-custom-cat">
			<h1 @click="select('ProductThumbnailsCustomCat')">ProductThumbnailsCustomCat</h1>
			<product-thumbnails-custom-cat v-if="currentComponent==='ProductThumbnailsCustomCat'" />
		</div>
		<div class="payment">
			<h1 @click="select('Payment')">Payment</h1>
			<payment :amount="paymentAmount" v-if="currentComponent==='Payment'" />
		</div>
		<div class="shipping-form">
			<h1 @click="select('ShippingForm')">ShippingForm</h1>
			<shipping-form v-if="currentComponent==='ShippingForm'" />
		</div>
	</div>
</template>
<script>
import ProductGallery from "@/components/ProductGallery.vue";
import ContactForm from "@/components/ContactForm.vue";
import ShippingForm from "@/components/ShippingForm.vue";
import Payment from "@/components/Payment.vue";
import Loader from "@/components/Loader.vue";
import CountrySelect from "@/components/CountrySelect.vue";
import FullImage from "@/components/FullImage.vue";
import Gallery from "@/components/Gallery.vue";
import InstagramConnect from "@/components/InstagramConnect.vue";
import ProductThumbnailsSmartMockup from "@/components/ProductThumbnailsSmartMockup.vue";
import ProductThumbnailsCustomCat from "@/components/ProductThumbnailsCustomCat.vue";
import ProductThumbnailsScroll from "@/components/ProductThumbnailsScroll.vue";
import Steps from '@/components/Steps.vue'
import { httpGet } from '@/lib/http'

export default {
	name: 'components-component',
	components: { ProductGallery, ContactForm, ShippingForm, Payment, Loader, CountrySelect, FullImage, Gallery, InstagramConnect, ProductThumbnailsSmartMockup, ProductThumbnailsCustomCat, ProductThumbnailsScroll, Steps },
	data () {
		return {
			fullImageSrc: 'https://loremflickr.com/600/600',
			productThumbnailsSmartMockupId: null,
			productThumbnailsScrollId: null,
			paymentAmount: 13.99,
			currentComponent: null,
		}
	},
	async created() {
		const response = await httpGet('products')
		this.$store.commit('setSkuId', response.products[0].skus[0].skuId) 
		this.$store.commit('setCountry', 'US')
	},
	methods: {
		select(component) {
			if (this.currentComponent === component) {
				this.currentComponent = null
			} else {
				this.currentComponent = component
			}
		},
		galleryLoadPage() {
			const pictureUrls = []
			for (let i = 0; i < 20; i++) {
				const isSquare = Math.floor(Math.random()*1.2)
				const width = 600
				let height
				if (isSquare) {
					height = 600
				} else {
					height = Math.floor(width * (0.5 + Math.random()))
				}
				pictureUrls.push(`https://loremflickr.com/${width}/${height}`)
			}
			return {
				pictureUrls,
				hasNextPage: true,
			}
		},
		gallerySelect(url) {
			this.$toasted.info('Gallery.select:' + url)
			console.log('Gallery.select:' + url)
		},
		fullImageSelect(url) {
			this.$toasted.info('FullImage.select:' + url)
			console.log('FullImage.select:' + url)
		},
		productGallerySelect(product) {
			console.log(product)
			this.$toasted.info('productThumbnails selected: ' + JSON.stringify(product))
		},
		productThumbnailsSmartMockupSelect(productThumbnailsSmartMockupIdId) {
			this.productThumbnailsSmartMockupIdId = productThumbnailsSmartMockupIdId
		},
		productThumbnailsScrollSelect(productThumbnailsScrollIdId) {
			this.productThumbnailsScrollIdId = productThumbnailsScrollIdId
		},
	},
}
</script>
<style lang="scss" scoped>
h1 {
	font-size: 20px;
	cursor: pointer;
	&:hover {
		background: #888;
		color: #fff;
	}
}
.components-component {
	width: 1280px;
	max-width: 100%;
	margin: 0 auto;
	> div {
		border-bottom: 3px dashed #999;
		padding: 20px 0;
	}
}
</style>