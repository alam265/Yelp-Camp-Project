const Campground = require('../models/campground')
const Review = require('../models/reviewsSchema')

module.exports.createReview = async (req, res) => {
    const { id } = req.params
    const camp = await Campground.findById(id)
    const review = new Review(req.body)
    review.author = req.user._id

    camp.reviews.push(review)
    await camp.save()
    await review.save()
    req.flash('success', 'review added!')
    res.redirect(`/campgrounds/${camp._id}`)



}

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId)
    req.flash("success", 'review deleted!')
    res.redirect(`/campgrounds/${id}`)

}

module.exports.renderEditForm = async(req, res)=>{
    const {id, reviewId} = req.params
    const foundCamp = await Campground.findById(id) 
    const review = await Review.findById(reviewId)
    res.render('review/edit', {foundCamp, review})
}

module.exports.editReview = async(req, res)=> {
    const {id, reviewId} = req.params  
    await Review.findByIdAndUpdate(reviewId, {...req.body})
    req.flash('success','Review Edited')
    res.redirect(`/campgrounds/${id}`)
}