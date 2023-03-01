const jwt = require('express-jwt')
const express = require(`express`)
const controller = require(`src/controllers/v1/mockups.js`)
const router = express.Router()

router.put(`/refresh`, controller.refresh)
router.get(`/`, controller.index)
router.get(`/:mockupId`, controller.show)
router.put(`/:mockupId`, controller.update)
router.delete(`/:mockupId`, controller.destroy)

module.exports = router
