const express = require('express');
const router = express.Router({ mergeParams: true });
const Campground = require('../models/campground');
const Review = require('../models/reviewsSchema');
const wrapAsync = require('../utilis/wrapError');
const validateReview = require('../middleware/validateReview');
const { isLoggedIn } = require('../middleware/isLoggedin');
const { isOwnReview } = require('../middleware/isOwnReview')

//Corntroller Import 
const ReviewController = require('../controllers/review');



router.post("/", isLoggedIn, wrapAsync(ReviewController.createReview))

router.delete("/delete/:reviewId",isOwnReview, wrapAsync(ReviewController.deleteReview))

router.get("/edit/:reviewId",isOwnReview, wrapAsync(ReviewController.renderEditForm) )

router.patch("/edit/:reviewId", wrapAsync(ReviewController.editReview))

module.exports = router
