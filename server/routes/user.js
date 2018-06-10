const express = require('express')
const router = express.Router()

const userController = require('../controller/user')

// API call for user details
router.post('/get', userController.getUserInfo)

// API call for user login
router.post('/login', userController.login)

// API call for user logout
router.get('/logout', userController.logout)

module.exports = router
