const express = require('express')
const app = express()
const path = require('path') 
const mongoose = require('mongoose')
const Campground = require("./models/campground")
const validateCampground = require("./middleware/validateCampground")

const ejsMate = require('ejs-mate')
const AppError = require('./uitlis/appError')

const wrapAsync = require('./uitlis/wrapError')

const methodOverride = require('method-override')
const { wrap } = require('module')
app.use(methodOverride('_method'))

app.set('view engine','ejs') 
app.set('views',path.join(__dirname,'views'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())



app.engine('ejs',ejsMate)

mongoose.connect('mongodb://127.0.0.1:27017/Yelp-Camp')
.then(()=> {
    console.log('MongoDB Connected')
}).catch(()=> {
    console.log('OPPS an Error Occured!')
})





app.get('/',(req, res) => {
    res.render('campgrounds/home' ,{title:"Home - YelpCamp"})
    
})

app.get('/campgrounds',async(req, res)=> {
    const camps = await Campground.find({})
    res.render('campgrounds/index', { camps , title:"All Campgrounds"})
})

app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new', {title:"Add Campground- YelpCamp"})
})

app.post('/campgrounds',validateCampground, wrapAsync(async(req, res) => {
    
    const newCamp = new Campground({...req.body})
    await newCamp.save()
    res.redirect(`/campgrounds/${newCamp._id}`)
    
    
})) 

app.get('/campgrounds/:id', wrapAsync(async(req, res)=> {
    const {id} = req.params 
    const foundCamp = await Campground.findById(id)
    res.render('campgrounds/show', { foundCamp , title:"Details - YelpCamp" })
})) 


app.get('/campgrounds/:id/edit', wrapAsync(async(req , res) => {
    const { id } = req.params 
    const foundCamp = await Campground.findById(id)
    res.render('campgrounds/edit', {foundCamp,title:"Edit - YelpCamp"})
})) 

app.patch('/campgrounds/:id',validateCampground, wrapAsync(async(req, res)=> {
    const {id} = req.params
    await Campground.findByIdAndUpdate(id, {...req.body})
    res.redirect(`/campgrounds/${id}`)


})) 


app.delete('/campgrounds/:id', wrapAsync(async(req , res)=> {
    const { id } = req.params 
    await Campground.findByIdAndDelete(id)
    res.redirect('/campgrounds')
    

})) 



app.all('*', (req , res, next) => {
    next(new AppError('Page Not Found',404))
    
})
app.use((err, req, res , next)=> {
   
    
    res.render('error', { err })
    
})






app.listen(3000, ()=> {
    console.log("Listening on PORT 3000")
})