const mongoose = require('mongoose')
const Review = require("./reviewsSchema")
const User = require('./user')
const Schema = mongoose.Schema




const ImageSchema = new Schema({
    url: String,
    filename: String
})

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
});

const CampgroundSchema = new Schema({

    title: String,
    price: {
        type: Number,
        min: [0, 'Price can not be negative']

    },
    description: String,
    location: String,
    images: [ImageSchema],

    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'


    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'

        }
    ],
    geoLocation: {
        type: {
          type: String, 
          enum: ['Point'], 
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
      }

    })

CampgroundSchema.post('findOneAndDelete', async function (deletedCampground) {
    if (deletedCampground) {
        await Review.deleteMany({
            _id: {
                $in: deletedCampground.reviews
            }
        })
    }
})

module.exports = mongoose.model('Campground', CampgroundSchema)
