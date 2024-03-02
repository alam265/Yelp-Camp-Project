const express = require("express")
const router = express.Router()
const User = require("../models/user")

router.get('/register', (req, res)=>{
    res.render('user/register')
})

router.post('/register', async(req, res)=>{
    try{
        const {username, email, password} = req.body 
        const newUser = new User({username,email})
        await User.register(newUser, password)
        req.flash('success','Welcome to YelpCamp')
        res.redirect('/campgrounds')
    
    }catch(e){
        req.flash('error',e.message)
        res.redirect('/register')
    }
})

module.exports = router