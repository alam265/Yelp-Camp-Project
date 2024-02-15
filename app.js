const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const Campground = require("./models/campground")
const validateCampground = require("./middleware/validateCampground")
const Review = require("./models/reviewsSchema")
const campgroundRouter = require('./routes/campground')
const reviewRouter = require('./routes/reviews')
const ejsMate = require('ejs-mate')
const AppError = require('./utilis/appError')

const wrapAsync = require('./utilis/wrapError')

const methodOverride = require('method-override')

app.use(methodOverride('_method'))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())



app.engine('ejs', ejsMate)

mongoose.connect('mongodb://127.0.0.1:27017/Yelp-Camp')
    .then(() => {
        console.log('MongoDB Connected')
    }).catch(() => {
        console.log('OPPS an Error Occured!')
    })





app.get('/', (req, res) => {
    res.render('campgrounds/home', { title: "Home - YelpCamp" })

})

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