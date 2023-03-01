const jwt = require('express-jwt')
const express = require(`express`)
const controller = require(`src/controllers/v1/trendingHashtags.js`)
const router = express.Router()

router.get(`/`, jwt({ secret: process.env.JWT_SECRET }), controller.index)
router.get(`/:hashtag`, controller.show)
router.post(`/:trendingHashtagId/start`, jwt({ secret: process.env.JWT_SECRET }), controller.start)
router.post(`/:trendingHashtagId/stop`, jwt({ secret: process.env.JWT_SECRET }), controller.stop)
router.delete(`/:trendingHashtagId`, jwt({ secret: process.env.JWT_SECRET }), controller.destroy)

module.exports = router