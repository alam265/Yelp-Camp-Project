const express = require('express');
const router = express.Router({ mergeParams: true });
const Campground = require('../models/campground');
const Review = require('../models/reviewsSchema');
const wrapAsync = require('../utilis/wrapError');
const validateReview = require('../middleware/validateReview');
const { isLoggedIn } = require('../middleware/isLoggedin');
const { isOwnReview } = require('../middleware/isOwnReview')


router.post("/", isLoggedIn, wrapAsync(async (req, res) => {
    const { id } = req.params
    const camp = await Campground.findById(id)
    const review = new Review(req.body)
    review.author = req.user._id

    camp.reviews.push(review)
    await camp.save()
    await review.save()
    req.flash('success', 'review added!')
    res.redirect(`/campgrounds/${camp._id}`)



}))

router.delete("/delete/:reviewId",isOwnReview, wrapAsync(async (req, res) => {
    const { id, reviewId } = req.params
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId)
    req.flash("success", 'review deleted!')
    res.redirect(`/campgrounds/${id}`)



}))

module.exports = router
