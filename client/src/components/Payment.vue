<template>
	<div class="payment">
		<div class="field">
			<label for="card-number">Card Number</label>
			<div class="hosted-field" id="card-number"></div>
		</div>
		<div class="field">
			<label for="cvv">CVV</label>
			<div class="hosted-field" id="cvv"></div>
		</div>
		<div class="field">
			<label for="expiration-date">Expiration Date</label>
			<div class="hosted-field" id="expiration-date"></div>
		</div>
		<div class="field text-only" v-if="totalPrice">
			Your total is ${{formatPrice(totalPrice)}}
		</div>
		<img
			src="https://s3.amazonaws.com/braintree-badges/braintree-badge-wide-light.png"
			class="button"
			@click="checkout"
			:class="{clicked: checkoutButtonClicked, deactivated: isLoading}"
		 	width="280px" height ="44px" border="0"
		/>
		<loader v-if="isLoading" />
	</div>
</template>

<script>
import Loader from '@/components/Loader.vue'
import { httpPost, httpGet } from '@/lib/http'
import { formatPrice } from '@/lib/utils'
import braintree from 'braintree-web'
let braintreeInstance

export default {
	name: 'payment',
	data() {
		return {
			isLoading: false,
			checkoutButtonClicked: false,
		}
	},
	components: { Loader },
	props: [ 'amount' ],
	computed: {
		quantity() {
			return this.$store.state.quantity
		},
		skuId() {
			return this.$store.state.skuId
		},
		firstName() {
			return this.$store.state.firstName
		},
		lastName() {
			return this.$store.state.lastName
		},
		email() {
			return this.$store.state.email
		},
		address() {
			return this.$store.state.address
		},
		city() {
			return this.$store.state.city
		},
		phone() {
			return this.$store.state.phone
		},
		zipCode() {
			return this.$store.state.zipCode
		},
		country() {
			return this.$store.state.country
		},
		shipping() {
			return this.$store.state.shipping
		},
		totalPrice() {
			if (this.shipping) {
				return this.amount + this.shipping.cost + (this.quantity - 1) * this.shipping.addl
			}
		},
	},
	async mounted() {
		await this.initBraintree()
	},
	methods: {
		formatPrice,
		async checkout() {
			this.checkoutButtonClicked = true
			setTimeout(() => {
				this.checkoutButtonClicked = false
			}, 500)
			let errors = false
			if (!this.skuId) {
				errors = true
				this.$toasted.error('Please pick a size')
			}
			if (!this.shipping) {
				errors = true
				this.$toasted.error('Please pick a shipping method')
			}
			if (!this.totalPrice) {
				errors = true
				this.$toasted.error('Can\'t compute the total price')
			}
			if (!this.quantity || !this.firstName || !this.lastName || !this.email || !this.address || !this.city || !this.zipCode || !this.country || !this.phone) {
				errors = true
				this.$toasted.error('Please enter all the mandatory fields marked with *')
			}
			if (errors) return
			try {
				this.isLoading = true
				const payload = await braintreeInstance.tokenize()
				const response = await httpPost(`orders`, {
					amount: this.totalPrice,
					nonce: payload.nonce,
					skuId: this.skuId,
					quantity: this.quantity,
					firstName: this.firstName,
					lastName: this.lastName,
					email: this.email,
					phone: this.phone,
					address: this.address,
					city: this.city,
					state: this.$store.state.state,
					zipCode: this.zipCode,
					country: this.country,
					previewUrl: this.$store.state.previewUrl,
					shippingId: this.shipping.label,
					productId: this.$store.state.product.metadata.id,
					designUrl: this.$store.state.designUrl,
					isTwitter: this.$store.state.isTwitter,
				})
				if (response.status === 201) {
					this.$toasted.success(`Purchase completed`)
					this.$store.commit('reset')
					this.$router.push('/')
				} else {
					const errorMessage = (await response.json()).message
					this.$toasted.error(errorMessage)
				}
			} catch (err) {
				const message = err.message || `Error 2 submitting payment. Please report this to us!`
				this.$toasted.error(message)
			}
			this.isLoading = false
		},
		async initBraintree() {
			this.isLoading = true
			const response = await httpGet(`orders/init`)
			if (response.error) {
				console.log(response)
				throw new Error(response.error)
			}
			const client = await braintree.client.create({ authorization: response.clientToken })
			braintreeInstance = await braintree.hostedFields.create({
				client,
				styles: {
					'input': {
						'font-size': '24px',
						'color': '#fff',
					},
					'input.invalid': {
						'color': '#ffeeee',
					},
					'input.valid': {
						'color': '#eeffee',
					}
				},
				fields: {
					number: {
						selector: '#card-number',
						placeholder: '4111 1111 1111 1111',
					},
					cvv: {
						selector: '#cvv',
						placeholder: '123',
					},
					expirationDate: {
						selector: '#expiration-date',
						placeholder: '10/2022',
					}
				}
			})
			this.isLoading = false
		},
	},
}
</script>
<style scoped lang="scss">
.button {
	margin: 20px 0;
	border-radius: 10px;
	border: 1px solid #aaa;
	box-shadow: inset 3px 3px 10px #edc;
	&.clicked {
		opacity: 0.5;
	}
	&.deactivated {
		opacity: 0.2;
		pointer-events: none;
	}
	&:hover {
		box-shadow: inset -3px -3px 10px #dcb;
	}
}
.hosted-field {
	height: 75px;
	padding: 25px 17px;
	background: #114;
}

</style>