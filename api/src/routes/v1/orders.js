const jwt = require('express-jwt')
const express = require(`express`)
const controller = require(`src/controllers/v1/orders.js`)
const router = express.Router()

router.post(`/`, controller.create)
router.get(`/init`, controller.getToken)
router.get(`/shipping`, controller.shippingCosts)
router.delete(`/:orderId`, jwt({ secret: process.env.JWT_SECRET }), controller.destroy)
router.get(`/`, jwt({ secret: process.env.JWT_SECRET }), controller.index)
router.get(`/:orderId`, jwt({ secret: process.env.JWT_SECRET }), controller.show)
router.get(`/:orderId/status`, jwt({ secret: process.env.JWT_SECRET }), controller.status)
router.put(`/:orderId`, jwt({ secret: process.env.JWT_SECRET }), controller.update)

module.exports = router
