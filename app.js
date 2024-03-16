if(process.env.NODE_ENV!=="production"){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const ejsMate = require('ejs-mate')
const AppError = require('./utilis/appError')
const User = require("./models/user")




//Routes 
const campgroundRouter = require('./routes/campground')
const reviewRouter = require('./routes/reviews')
const userRouter = require('./routes/user')

// Passport and Passport-local 
const passport  = require("passport")
const localStartegy = require("passport-local")


const methodOverride = require('method-override')
app.use(methodOverride('_method'))

//Setup public folder
app.use(express.static(path.join(__dirname, 'public')))

//Setup Ejs 
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')

//Setup views Folder
app.set('views', path.join(__dirname, 'views'))

//Body Parser
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Session Setup
const session = require('express-session')
app.use(session
    ({
        secret: 'thisisnotagoodsecret!',
        resave: false,  
        saveUninitialized: true,
        cookie: {
            httpOnly: true,
            expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
            maxAge: 1000 * 60 * 60 * 24 * 7
        }
    }))
//Flash Setup
const flash = require('connect-flash')
app.use(flash())

// Passport Setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStartegy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




mongoose.connect('mongodb://127.0.0.1:27017/Yelp-Camp')
    .then(() => {
        console.log('MongoDB Connected')
    }).catch(() => {
        console.log('OPPS an Error Occured!')
    })

//1st Middleware 
app.use((req, res, next) => {
    
    res.locals.currentUser = req.user
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next()
})
    


app.get('/', (req, res) => {
    res.render('campgrounds/home', { title: "Home - YelpCamp" })

})

app.use("/",userRouter)
app.use('/campgrounds', campgroundRouter)
app.use("/campgrounds/:id/reviews", reviewRouter)


app.all('*', (req, res, next) => {
    next(new AppError('Page Not Found', 404))

})
app.use((err, req, res, next) => {


    res.render('error', { err })

})






app.listen(3000, () => {
    console.log("Listening on PORT 3000")
})