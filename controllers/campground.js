const Campground = require('../models/campground')
//Cloudinary Import
const {cloudinary} = require('../cloudinary/main')

//Setup Mapbox
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geoCoder = mbxGeocoding({ accessToken: process.env.MAPBOX_TOKEN });


module.exports.index = async (req, res) => {
    const camps = await Campground.find({})
    res.render('campgrounds/index', { camps, title: "All Campgrounds - YelpCamp" })
}

module.exports.renderCreateCampgroundForm = (req, res) => {
    res.render('campgrounds/new', { title: "Add Campground- YelpCamp" })
}

module.exports.CreateCampground = async (req, res) => {
    const geoData = await geoCoder.forwardGeocode({
        query: req.body.campground.location,
        limit: 2
      })
        .send()

    const newCamp = new Campground({ ...req.body.campground })
    newCamp.author = req.user._id
    newCamp.images = req.files.map(f => ({url:f.path, filename: f.filename}))
    newCamp.geoLocation = geoData.body.features[0].geometry
    await newCamp.save()
    req.flash('success', "Successfully Created a Campground!")
    res.redirect(`/campgrounds/${newCamp._id}`)


}

module.exports.showCampground = async (req, res) => {
    const { id } = req.params
    const foundCamp = await Campground.findById(id).populate({
        path: 'reviews',
        populate: {
            path: 'author'             //Nested populate
        }
    }).populate('author')
    console.log(foundCamp)
    if (!foundCamp) {
        req.flash('error', 'No Campground is found')
        return res.redirect('/campgrounds')
    }
    res.render('campgrounds/show', { foundCamp, title: "Details - YelpCamp" })

}

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params
    const foundCamp = await Campground.findById(id)
    if (!foundCamp) {
        req.flash('error', 'No Campground is found')
        return res.redirect('/campgrounds')
    }
    res.render('campgrounds/edit', { foundCamp, title: "Edit - YelpCamp" })
}

module.exports.editCampground = async (req, res) => {
    const geoData = await geoCoder.forwardGeocode({
        query: req.body.campground.location,
        limit: 2
      })
        .send()
    const { id } = req.params
    console.log(req.body)
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground })
    const imgs = req.files.map(f => ({url:f.path, filename: f.filename}))
    campground.geoLocation = geoData.body.features[0].geometry
    campground.images.push(...imgs)
    await campground.save()

    if(req.body.deleteImages){
        for(let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename)

        }
        await campground.updateOne({$pull :{images: {filename : {$in: req.body.deleteImages}}}})
    }



    req.flash('success', "Edited")
    res.redirect(`/campgrounds/${id}`)


}

module.exports.deleteCampground = async (req, res) => {
    const { id } = req.params
    await Campground.findByIdAndDelete(id)
    req.flash('success', 'Deleted Successfully')
    res.redirect('/campgrounds')


}