const mongoose = require('mongoose');

//Variable for mongoose Schema(shortcut). mongoose.Schema.Types.afd <==> Schema.Types.afd
const Schema = mongoose.Schema;

const campgroundSchema = new Schema({
    title: String,
    price: String,
    description: String,
    location: String
});

module.exports = mongoose.model('Campground', campgroundSchema);