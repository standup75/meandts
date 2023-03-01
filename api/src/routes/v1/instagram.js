const express = require(`express`)
const controller = require(`src/controllers/v1/instagram.js`)
const router = express.Router()

router.get(`/token`, controller.getToken)
router.get(`/media`, controller.getMedia)

module.exports = router
