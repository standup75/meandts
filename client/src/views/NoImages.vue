<template>
	<div class="no-images-component">
		<preview-maker>
			<div class="kitten-container" @click="selectKitten()">
				<div class="copy">
					<p>Your instagram account does not contain any pictures. How about printing a beautiful kitten?</p>
					<a href="/">Hell no, let me try again</a>
					<a href="/hashtag">Yes, but no, can I print some random text instead?</a>
				</div>
				<img src="https://s3-us-west-1.amazonaws.com/assets.meandts.com/assets/placeholder_kitten.jpg" />
			</div>
		</preview-maker>
	</div>
</template>

<script>
import PreviewMaker from '@/components/PreviewMaker.vue'

export default {
	name: 'no-images-component',
	components: { PreviewMaker },
	async created() {
		this.$store.commit('setStepsLabels', ['Pick a Picture', 'Pick a product', 'Preview & Order'])
	},
	head: {
		title() {
			return {
				inner: 'Me & T\'s | Print your kitten pictures on shirts',
			}
		},
	},
	methods: {
		selectKitten() {
			this.$store.commit('setDesignUrl', 'https://s3-us-west-1.amazonaws.com/assets.meandts.com/assets/placeholder_kitten.jpg')
		},
	},
}
</script>
<style lang="scss" scoped>
.kitten-container {
	width: 520px;
	margin: 50px auto 0;
	overflow: hidden;
	cursor: pointer;
	.copy {
		width: 250px;
		float: left;
		margin-right: 20px;
		text-align: right;
		font-size: 23px;
		line-height: 1.3;
		a {
			display: block;
			font-size: 13px;
			margin-top: 10px;
		}
	}
	img {
		display: block;
		float: left;
		width: 250px;
	}
}
</style>