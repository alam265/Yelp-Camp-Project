const Review = require('../models/reviewsSchema')

module.exports.isOwnReview = async(req, res, next)=> {
    const {id, reviewId} = req.params 
    const review = await Review.findById(reviewId)
    if(!review.author.equals(req.user._id)){
        req.flash('error','You do not have permission')
        return res.redirect(`/campgrounds/${id}`)
    }
    next()

}