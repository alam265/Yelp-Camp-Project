const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CampgroundSchema = new Schema({
    title:String, 
    price:{
        type: Number,
        min:[0,'Price can not be negative'] 

    }, 
    description:String, 
    location: String, 
    image: String

})

module.exports = mongoose.model('Campground',CampgroundSchema)
