const jwt = require('express-jwt')
const express = require(`express`)
const controller = require(`src/controllers/v1/products.js`)
const router = express.Router()

router.post(`/`, jwt({ secret: process.env.JWT_SECRET }), controller.create)
router.delete(`/:productId`, jwt({ secret: process.env.JWT_SECRET }), controller.destroy)
router.get(`/`, controller.index)
router.get(`/signS3Put`, controller.signS3Put)
router.get(`/:productId`, controller.show)
router.post(`/:productId/:colorHex/preview`, controller.buildPreview)
router.post(`/:productId/preview`, controller.buildPreview)
router.put(`/:productId`, jwt({ secret: process.env.JWT_SECRET }), controller.update)

module.exports = router
