<template>
	<div class="instagram-connect-component">
		<button
			:class="{ clicked }"
			class="login"
			@click="connect"
		>
			<img src="@/assets/ig.svg" v-if="!clicked">
			<img src="@/assets/ig_blue.svg" v-if="clicked">
			Connect to your Instagram
		</button>
	</div>
</template>
<script>
export default {
	name: 'instagram-connect',
	data() {
		return {
			clicked: false,
		}
	},
	methods: {
		connect() {
			this.clicked = true
			location.href = `https://api.instagram.com/oauth/authorize?client_id=${process.env.VUE_APP_INSTAGRAM_APP_ID}&redirect_uri=${encodeURIComponent(process.env.VUE_APP_INSTAGRAM_REDIRECT_URL)}&scope=user_profile,user_media&response_type=code`
		},
	},
}
</script>
<style lang="scss" scoped>
.instagram-connect-component {
	height: 220px;
	width: 450px;
	max-width: calc(100% - 40px);
	padding: 0 20px;
	margin: 0 auto;
}
.login {
	padding: 10px 10px 10px 45px;
	background-color: #3C52C9;
	color: #fff;
	border: 1px solid #3C52C9;
	line-height: 15px;
	min-height: 45px;
	position: relative;
	margin: 40px 15px;
	font-size: 15px;
	img {
		position: absolute;
		left: 10px;
		top: 10px;
		width: 25px;
	}
	&.clicked {
		background-color: #fff;
		color: #3C52C9;
	}
}
.switch-link {
	display: block;
	text-align: center;
	margin-bottom: 25px;
	font-size: 14px;
}
</style>