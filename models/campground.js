const mongoose = require('mongoose')
const Review = require("./reviewsSchema")
const Schema = mongoose.Schema

const CampgroundSchema = new Schema({
    title:String, 
    price:{
        type: Number,
        min:[0,'Price can not be negative'] 

    }, 
    description:String, 
    location: String, 
    image: String,
    reviews: [ 
        {
            type: Schema.Types.ObjectId ,
            ref: 'Review'
            
        }
    ]

})

CampgroundSchema.post('findOneAndDelete', async function (deletedCampground) {
    if(deletedCampground){
        await Review.deleteMany({
            _id:{
                $in: deletedCampground.reviews
            }
        })
    }
})

module.exports = mongoose.model('Campground',CampgroundSchema)
