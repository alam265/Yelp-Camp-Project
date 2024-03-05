const express = require('express')
const router = express.Router()
const Campground = require('../models/campground')
//Middleware import 
const {isLoggedIn} = require('../middleware/isLoggedin')
const validateCampground = require('../middleware/validateCampground')
const wrapAsync = require('../utilis/wrapError')

router.get('/', async (req, res) => {
    const camps = await Campground.find({})
    res.render('campgrounds/index', { camps, title: "All Campgrounds - YelpCamp" })
})

router.get('/new',isLoggedIn, (req, res) => {
    res.render('campgrounds/new', { title: "Add Campground- YelpCamp" })
})

router.post('/', validateCampground, wrapAsync(async (req, res) => {

    const newCamp = new Campground({ ...req.body })
    await newCamp.save()
    req.flash('success', "Successfully Created a Campground!")
    res.redirect(`/campgrounds/${newCamp._id}`)


}))

router.get('/:id', wrapAsync(async (req, res) => {
    const { id } = req.params
    const foundCamp = await Campground.findById(id).populate('reviews')
    if(!foundCamp){
        req.flash('error', 'No Campground is found')
        return res.redirect('/campgrounds')
    }
    res.render('campgrounds/show', { foundCamp, title: "Details - YelpCamp" })

}))


router.get('/:id/edit',isLoggedIn, wrapAsync(async (req, res) => {
    const { id } = req.params
    const foundCamp = await Campground.findById(id)
    if(!foundCamp){
        req.flash('error', 'No Campground is found')
        return res.redirect('/campgrounds')
    }
    res.render('campgrounds/edit', { foundCamp, title: "Edit - YelpCamp" })
}))

router.patch('/:id', validateCampground, wrapAsync(async (req, res) => {
    const { id } = req.params
    await Campground.findByIdAndUpdate(id, { ...req.body })
    req.flash('success',"Edited")
    res.redirect(`/campgrounds/${id}`)


}))


router.delete('/:id',isLoggedIn, wrapAsync(async (req, res) => {
    const { id } = req.params
    await Campground.findByIdAndDelete(id)
    req.flash('success','Deleted Successfully')
    res.redirect('/campgrounds')


}))


module.exports = router


