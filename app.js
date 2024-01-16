const express = require('express')
const app = express()
const path = require('path') 
const mongoose = require('mongoose')
const Campground = require("./models/campground")

const ejsMate = require('ejs-mate')
const AppError = require('./uitlis/appError')

const wrapAsync = require('./uitlis/wrapError')

const methodOverride = require('method-override')
const { wrap } = require('module')
app.use(methodOverride('_method'))

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))
app.use(express.urlencoded({ extended: true }))

app.engine('ejs',ejsMate)

mongoose.connect('mongodb://127.0.0.1:27017/Yelp-Camp')
.then(()=> {
    console.log('MongoDB Connected')
}).catch(()=> {
    console.log('OPPS an Error Occured!')
})


app.get('/campgrounds',async(req, res)=> {
    const camps = await Campground.find({})
    res.render('campgrounds/index', { camps })
})

app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new')
})

app.post('/campgrounds', wrapAsync(async(req, res) => {
    const newCamp = new Campground({...req.body})
    await newCamp.save()
    res.redirect(`/campgrounds/${newCamp._id}`)
    
    
})) 

app.get('/campgrounds/:id/edit', wrapAsync(async(req , res) => {
    const { id } = req.params 
    const foundCamp = await Campground.findById(id)
    res.render('campgrounds/edit', {foundCamp})
})) 

app.patch('/campgrounds/:id', wrapAsync(async(req, res)=> {
    const {id} = req.params
    await Campground.findByIdAndUpdate(id, {...req.body})
    res.redirect(`/campgrounds/${id}`)


})) 

app.get('/campgrounds/:id', wrapAsync(async(req, res)=> {
    const {id} = req.params 
    const foundCamp = await Campground.findById(id)
    res.render('campgrounds/show', { foundCamp })
})) 

app.delete('/campgrounds/:id', wrapAsync(async(req , res)=> {
    const { id } = req.params 
    await Campground.findByIdAndDelete(id)
    res.redirect('/campgrounds')
    

})) 

app.get('/',(req, res) => {
    res.render('campgrounds/home')
})


app.get('*', (req , res, next) => {
    next(new AppError('Page Not Found',404))
    
})
app.use((err, req, res , next)=> {
   
    console.log(err)
    res.render('error', { err })
    
})






app.listen(3000, ()=> {
    console.log("Listening on PORT 3000")
})