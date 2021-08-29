const mongoose = require('mongoose');

//Variable for mongoose Schema(shortcut). mongoose.Schema.Types.afd <==> Schema.Types.afd
const Schema = mongoose.Schema;

const campgroundSchema = new Schema({
    location: String,
    title: String,
    image: String,
    description: String,
    price: Number
});

module.exports = mongoose.model('Campground', campgroundSchema);