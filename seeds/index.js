const mongoose = require('mongoose')

const cities = require('./cities')
const {descriptors, places} = require('./seedHelper')
const Campground = require("../models/campground")

mongoose.connect('mongodb://127.0.0.1:27017/Yelp-Camp')
.then(()=> {
    console.log('MongoDB Connected')
}).catch(()=> {
    console.log('OPPS an Error Occured!')
})

const randomNumber = arr => Math.floor(Math.random() * arr.length) 


const seedDB = async()=> {
    await Campground.deleteMany({})
    for (let i=0 ; i< 50 ; i++){
        const camp = new Campground({
            author: '65e5cd69c0cb25951c4ab424',
            location: `${cities[randomNumber(cities)].city}, ${cities[randomNumber(cities)].state}`, 
            title : `${descriptors[randomNumber(descriptors)]} ${places[randomNumber(places)]}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore quasi laboriosam, consequuntur cupiditate quae ducimus laudantium dolore ex animi, blanditiis necessitatibus, laborum expedita eos molestias explicabo impedit velit possimus dolor."
        })
        await camp.save()
    }
    
}

seedDB()
.then(()=>{
    mongoose.connection.close()
})

