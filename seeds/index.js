//Load JS modules 
const mongoose = require('mongoose');

//Require our campground model
const Campground = require('../models/campground');
const cities = require('./cities');
//destructure
const {places, descriptors} = require('./seedHelpers');

//Establish and check mongodb connection
mongoose.connect('mongodb+srv://robroskie:Snuggles69@cluster0.jh58z.mongodb.net/yelpCamp', {
    useNewUrlParser: true, 
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('database connected');
});

const sample = arr => {
    const element = arr[Math.floor(Math.random() * arr.length)];
    return element;
}

//These campgrounds should have a title, price, description and location 
const seedDB = async() => {
    await Campground.deleteMany({});

    for(let i = 0; i < 50; i++){
        const city_idx = Math.floor(Math.random() * cities.length);
        const price = Math.floor(Math.random() * 100);
        const c = new Campground({
            title: `${sample(descriptors)} ${sample(places)}`, 
            price: price,
            description: "ass and titties",
            location: `${cities[city_idx].city}, ${cities[city_idx].state}`
        })
        await c.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});