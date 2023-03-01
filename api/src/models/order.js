const mongoose = require('mongoose')
const utils = require('src/lib/utils');
const base = require("./base")

const orderSchema = new mongoose.Schema({
	createdAt: Date,
	updatedAt: Date,
	product: { type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true },
	email: String,
	status: String,
	skuId: String,
	quantity: Number,
	amount: Number,
	firstName: String,
	lastName: String,
	email: String,
	phone: String,
	address: String,
	city: String,
	state: String,
	zipCode: String,
	country: String,
	orderId: String,
	previewUrl: String,
	shippingId: String,
	designUrl: String,
	isTwitter: String,
});

orderSchema.pre('save', function(next) {
	if (!this.createdAt) {
		this.createdAt = this.updatedAt = new Date
		this.orderId = `${this.createdAt.getYear() - 100}-${this.createdAt.getMonth() + 1}-${utils.randomString(6)}`
	} else {
		this.updatedAt = new Date
	}
	return next()
})
orderSchema.statics.publicFields = ['createdAt', 'updatedAt', 'product', 'user', 'skuId', 'quantity', 'firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'zipCode', 'country', 'previewUrl', 'shippingId', 'designUrl', 'isTwitter' ]
orderSchema.statics.names = {
	singular: "order",
	plural: "orders"
}
const Order = base(orderSchema)
module.exports = Order
