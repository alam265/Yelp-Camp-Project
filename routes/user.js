const express = require("express")
const router = express.Router()
const passport  = require('passport')
const User = require("../models/user")
const {storeReturnTo} = require('../middleware/storeReturnTo')

router.get('/register', (req, res)=>{
    res.render('user/register')
})

router.post('/register', async(req, res)=>{
    try{
        const {username, email, password} = req.body 
        const newUser = new User({username,email})
        await User.register(newUser, password)
        
        req.login(newUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to Yelp Camp!');
            res.redirect('/campgrounds');
        })


    }catch(e){
        req.flash('error',e.message)
        res.redirect('/register')
    }
})

router.get("/login",(req, res)=>{
    res.render('user/login')
})

router.post('/login',storeReturnTo, passport.authenticate('local', {failureFlash:true, failureRedirect:'/login'}), (req,res)=>{
    req.flash('success','Welcome Back!!')
    

    const redirectUrl =  res.locals.returnTo || '/campgrounds'
    res.redirect(redirectUrl)
})

router.get('/logout',(req, res)=>{
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/campgrounds');
    });
})

module.exports = router