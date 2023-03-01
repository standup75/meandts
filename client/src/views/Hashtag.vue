<template>
	<div class="hashtag-component">
		<preview-maker v-if="!isLoading">
			<input type="text" v-model="textToPrint" class="input text-to-print" placeholder="Text to print"/>
			<div class="ff-container">
				<div class="ffs">
					<div v-for="ff in fonts" :key="ff" class="ff" @click="fontFamily = ff" :class="{ [ff]: true, active: fontFamily === ff }">ABC</div>
				</div>
			</div>
			<button @click="generateImage">Choose product</button>
			<a href="/">I would rather print a picture from my Instagam feed</a>
		</preview-maker>
		<loader v-if="isLoading" />
	</div>
</template>

<script>
import PreviewMaker from '@/components/PreviewMaker.vue'
import Gallery from '@/components/Gallery.vue'
import Loader from '@/components/Loader.vue'
import { httpGet, httpPost } from '@/lib/http'
import { getImageUrl } from "@/lib/graphicTools";

export default {
	name: 'hashtag-component',
	components: { Gallery, PreviewMaker, Loader },
	data() {
		return {
			isLoading: false,
			fonts: ["magical-mystery-tour", "bangers", "bowlby-one", "inconsolata", "sigmar-one"],
			fontFamily: "magical-mystery-tour",
		}
	},
	computed: {
		textToPrint: {
			get() {
				return this.$store.state.textToPrint
			},
			set(textToPrint) {
				this.$store.commit('setTextToPrint', textToPrint)
			},
		},
	},
	head: {
		title() {
			return {
				inner: 'Me & T\'s | Print text on shirts',
			}
		},
	},
	methods: {
		async generateImage() {
			if (!this.textToPrint) {
				this.$toasted.error('Please enter the text you want to print')
				return
			}
			this.isLoading = true;
			this.previewUrl = null;
			try {
				const imageUrl = await getImageUrl(this.textToPrint, this.fontFamily)
				this.previewUrl = (await httpPost(`products/${this.selectedId}/preview`, { imageUrl }, { parseJson: true })).src
				this.$store.commit('setDesignUrl', imageUrl)
			} catch (err) {
				console.error(err)
				this.$toasted.error('Ooops something went wrong')
			}
			this.isLoading = false
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
	max-width: calc(100% - 60px);
}
.ff-container {
	text-align: center;
	.ffs {
		display: inline-block;
		overflow: hidden;
		.ff {
			float: left;
			margin: 10px;
			padding: 10px;
			font-size: 22px;
			&.active {
				border-radius: 10px;
				background: #eee;
			}
		}
	}
}
.bangers {
	font-family: bangers;
}
.magical-mystery-tour {
  font-family: magical-mystery-tour;
}
.bowlby-one {
	font-family: bowlby-one;
}
.inconsolata {
	font-family: inconsolata;
}
.sigmar-one {
	font-family: sigmar-one;
}
a {
	display: block;
	font-style: italic;
	font-size: 12px;
}
</style>