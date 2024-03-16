const express = require('express')
const router = express.Router()
const Campground = require('../models/campground')
//Middleware import 
const { isLoggedIn } = require('../middleware/isLoggedin')
const { isAuthor } = require('../middleware/isAuthor')
const validateCampground = require('../middleware/validateCampground')
const wrapAsync = require('../utilis/wrapError')

//Controller Import 
const CampgroundController = require('../controllers/campground')

//Cloudinary storage import 
const {storage} = require('../cloudinary/main')

//setup Multer
const multer = require('multer')
const upload = multer({storage })





router.get('/', CampgroundController.index)

router.get('/new', isLoggedIn, CampgroundController.renderCreateCampgroundForm)

router.post('/',upload.array('image'), validateCampground, wrapAsync(CampgroundController.CreateCampground))


router.get('/:id', wrapAsync(CampgroundController.showCampground))


router.get('/:id/edit', isLoggedIn, isAuthor, wrapAsync(CampgroundController.renderEditForm))

router.patch('/:id', isLoggedIn, isAuthor, upload.array('image'), validateCampground, wrapAsync(CampgroundController.editCampground))


router.delete('/:id', isLoggedIn, isAuthor, wrapAsync(CampgroundController.deleteCampground))


module.exports = router


