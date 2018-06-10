const express = require('express')
const router = express.Router()

const adminController = require('../controller/admin')

router.get('/', adminController.authorize)

router.get('/create', adminController.authenticate)

router.get('/dashboard', adminController.authenticate)

module.exports = router
