const express = require("express")
const router = express.Router()
const passport = require('passport')
const User = require("../models/user")
const { storeReturnTo } = require('../middleware/storeReturnTo')
const Review = require('../models/reviewsSchema')

// Controller Import 
const UserController = require('../controllers/user')


router.get('/register', UserController.renderRegisterForm )

router.post('/register', UserController.register)

router.get("/login", UserController.renderLoginForm)

router.post('/login',storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), UserController.login)

router.get('/logout', UserController.logout)

module.exports = router