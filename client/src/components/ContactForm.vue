<template>
	<div class="contact-form">
		<div class="field">
			<transition name="fade">
				<label v-if="firstName">First Name</label>
			</transition>
			<input type="text" v-model="firstName" placeholder="First name *">
		</div>
		<div class="field">
			<transition name="fade">
				<label v-if="lastName">Last Name</label>
			</transition>
			<input type="text" v-model="lastName" placeholder="Last name *">
		</div>
		<div class="field">
			<transition name="fade">
				<label v-if="email">Email</label>
			</transition>
			<input type="text" v-model="email" placeholder="Email *">
		</div>
		<div class="field">
			<transition name="fade">
				<label v-if="phone">Phone Number</label>
			</transition>
			<input type="text" v-model="phone" placeholder="Phone number *">
		</div>
		<div class="field">
			<transition name="fade">
				<label v-if="address">Address</label>
			</transition>
			<input type="text" v-model="address" placeholder="Address *">
		</div>
		<div class="field">
			<transition name="fade">
				<label v-if="city">City</label>
			</transition>
			<input type="text" v-model="city" placeholder="City *">
		</div>
		<div class="field">
			<transition name="fade">
				<label v-if="state">State</label>
			</transition>
			<input type="text" v-model="state" placeholder="State *">
		</div>
		<div class="field">
			<transition name="fade">
				<label v-if="zipCode">Zip Code</label>
			</transition>
			<input type="text" v-model="zipCode" placeholder="Zip code *">
		</div>
		<country-select />
	</div>
</template>

<script>
import CountrySelect from '@/components/CountrySelect.vue'
import alpha3ToAlpha2 from "@/lib/alpha3ToAlpha2";
import crg from "country-reverse-geocoding";

export default {
	name: 'contact-form',
	components: { CountrySelect },
	computed: {
		firstName: {
			get() {
				return this.$store.state.firstName
			},
			set(firstName) {
				this.$store.commit('setFirstName', firstName)
			},
		},
		lastName: {
			get() {
				return this.$store.state.lastName
			},
			set(lastName) {
				this.$store.commit('setLastName', lastName)
			},
		},
		email: {
			get() {
				return this.$store.state.email
			},
			set(email) {
				this.$store.commit('setEmail', email)
			},
		},
		phone: {
			get() {
				return this.$store.state.phone
			},
			set(phone) {
				this.$store.commit('setPhone', phone)
			},
		},
		address: {
			get() {
				return this.$store.state.address
			},
			set(address) {
				this.$store.commit('setAddress', address)
			},
		},
		city: {
			get() {
				return this.$store.state.city
			},
			set(city) {
				this.$store.commit('setCity', city)
			},
		},
		state: {
			get() {
				return this.$store.state.state
			},
			set(state) {
				this.$store.commit('setState', state)
			},
		},
		zipCode: {
			get() {
				return this.$store.state.zipCode
			},
			set(zipCode) {
				this.$store.commit('setZipCode', zipCode)
			},
		},
	},
	created() {
		navigator.geolocation.getCurrentPosition((location) => {
			const crgInstance = crg.country_reverse_geocoding()
			const country = crgInstance.get_country(location.coords.latitude, location.coords.longitude)
			if (country) {
				this.country = alpha3ToAlpha2[country.code]
			}
			const state = crgInstance.get_us_state(location.coords.latitude, location.coords.longitude)
			if (state) {
				this.state = state.name
			}
		})
	},
}
</script>
