const mongoose = require('mongoose')
const Review = require("./reviewsSchema")
const User = require('./user')
const { array } = require('joi')
const Schema = mongoose.Schema

//Including Virtual Fields into Json
var schemaOptions = {
    toJSON: {
      virtuals: true
    }
  };


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
    geometry: {
        type: {
          type: String, 
          enum: ['Point'], 
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
      },
      

    },schemaOptions)


CampgroundSchema.virtual('properties.popUpMarkUp').get(function(){
    return `
    <strong><a href="/campgrounds/${this._id}">${this.title}</a><strong>
    <p>${this.description.substring(0, 20)}...</p>`
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
