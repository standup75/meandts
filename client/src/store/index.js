import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		skuId: null,
		quantity: 1,
		firstName: null,
		lastName: null,
		email: null,
		phone: null,
		address: null,
		city: null,
		state: null,
		zipCode: null,
		country: null,
		previewUrl: null,
		shipping: null,
		designUrl: null,
		textToPrint: null,
		isTwitter: false,
		product: false,
		accessToken: false,
		stepsLabels: ['Pick a Picture', 'Pick a product', 'Preview & Order'],
	},
	mutations: {
		setSkuId(state, skuId) {
			state.skuId = skuId
		},
		setQuantity(state, quantity) {
			state.quantity = quantity
		},
		setFirstName(state, firstName) {
			state.firstName = firstName
		},
		setLastName(state, lastName) {
			state.lastName = lastName
		},
		setEmail(state, email) {
			state.email = email
		},
		setPhone(state, phone) {
			state.phone = phone
		},
		setAddress(state, address) {
			state.address = address
		},
		setCity(state, city) {
			state.city = city
		},
		setState(state, _state) {
			state.state = _state
		},
		setZipCode(state, zipCode) {
			state.zipCode = zipCode
		},
		setCountry(state, country) {
			state.country = country
		},
		setPreviewUrl(state, previewUrl) {
			state.previewUrl = previewUrl
		},
		setShipping(state, shipping) {
			state.shipping = shipping
		},
		setDesignUrl(state, designUrl) {
			state.designUrl = designUrl
		},
		setIsTwitter(state, isTwitter) {
			state.isTwitter = isTwitter
		},
		setProduct(state, product) {
			state.product = product
		},
		setAccessToken(state, accessToken) {
			state.accessToken = accessToken
		},
		setStepsLabels(state, stepsLabels) {
			state.stepsLabels = stepsLabels
		},
		setTextToPrint(state, textToPrint) {
			state.textToPrint = textToPrint
		},
		reset(state) {
			state.skuId = null
			state.quantity = 1
			state.previewUrl = null
			state.designUrl = null
			state.product = null
			state.shipping = null
		},
	},
})
