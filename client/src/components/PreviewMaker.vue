<template>
	<div class="preview-maker">
		<steps :current="step" />
		<div v-if="isLoading">
			<loader />
		</div>
		<div v-if="!isLoading">
			<div v-if="!designUrl">
				<slot />
			</div>
			<div v-if="designUrl" class="content">
				<preview-image :src="designUrl" @refuse="resetDesign"/>
				<product-gallery @select="selectProduct"/>
			</div>
		</div>
	</div>
</template>

<script>
import Loader from '@/components/Loader.vue'
import ProductGallery from '@/components/ProductGallery.vue'
import Steps from '@/components/Steps.vue'
import PreviewImage from "@/components/PreviewImage.vue";
import { httpGet, httpPost } from '@/lib/http'

export default {
	name: 'preview-maker',
	components: { ProductGallery, Loader, Steps, PreviewImage },
	data() {
		return {
			isLoading: false,
		}
	},
	computed: {
		previewUrl: {
			get() {
				return this.$store.state.previewUrl
			},
			set(previewUrl) {
				this.$store.commit('setPreviewUrl', previewUrl)
			},
		},
		designUrl: {
			get() {
				return this.$store.state.designUrl
			},
			set(designUrl) {
				this.$store.commit('setDesignUrl', designUrl)
			},
		},
		step() {
			return this.designUrl ? 1 : 0
		},
	},
	methods: {
		async selectProduct({metadata, color}) {
			if (color.skus.length === 1) {
				this.$store.commit('setSkuId', color.skus[0].skuId)
			} else {
				this.$store.commit('setSkuId', null)
			}
			this.$store.commit('setProduct', {metadata, color})
			this.isLoading = true
			try {
				this.previewUrl = (await httpPost(`products/${metadata.id}/${color.hex}/preview`, {
					imageUrl: this.designUrl,
					sizePercent: metadata.printSize || 40,
					color: color.hex
				}, {
					parseJson: true
				})).src
				this.$router.push('product')
			} catch(err) {
				console.error(err)
				this.$toasted.error("Ooops something went wrong")
			}
			this.isLoading = false
		},
		resetDesign() {
			this.designUrl = null
		},
	},
}
</script>
<style lang="scss" scoped>
.content {
	margin-top: 21px;
}
</style>