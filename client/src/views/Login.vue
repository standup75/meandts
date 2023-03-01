<template>
	<div class="login-component">
		<div class="field">
			<transition name="fade">
				<label v-if="username">Username</label>
			</transition>
			<input type="text" v-model="username" placeholder="Enter your username *">
		</div>
		<div class="field">
			<transition name="fade">
				<label v-if="password">Password</label>
			</transition>
			<input type="password" v-model="password" placeholder="Enter your password *">
		</div>
		<div class="button" @click="login()">Login</div>
		<div class="error" v-if="error">{{error}}</div>
	</div>
</template>

<script>
import { httpGet } from '@/lib/http'

export default {
	name: 'login',
	data() {
		return {
			username: null,
			password: null,
			error: null,
		}
	},
	methods: {
		async login() {
			const response = await httpGet(`users/authenticate?username=${this.username}&password=${this.password}`)
			if (response && response.token) {
				localStorage.jwtToken = response.token
				this.$router.push(this.$route.params.nextUrl || '/admin')
			} else {
				this.error = "Incorrect username / password"
			}
		},
	},
}
</script>
<style scoped lang="scss">
.login-component {
	padding: 80px 0;
}
.button {
	font-size: 20px;
	background: #F4F0EC;
	border: 1px solid #fffaf0;
	padding: 15px;
	margin: 20px auto;
	border-radius: 2px;
	width: 470px;
	&.clicked {
		background: #876;
		color: #fff;
	}
}
.error {
	font-size: 30px;
	color: #811;
	padding-top: 50px;
	text-align: center;
}
</style>