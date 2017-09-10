var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        "default": Date.now
    }
});
var roomSchema = new mongoose.Schema({
    type: String,
    number: Number,
    description: String,
    photos: [String],
    price: Number
});
var hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    stars: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    services: [String],
    description: String,
    photos: [String],
    currency: String,
    //nested schema/nested document define before model is compiled
    reviews: [reviewSchema],
    rooms: [roomSchema],
    location: {
        address: String,
        //Always store coordinates longitude (e/w)
        // lattitude (N/S) order
        //needs to be indexed for geospatial coordinates
        coordinates: {
            type: [Number],
            index: '2dsphere'
        }
    }

});
//compile model
mongoose.model('Hotel', hotelSchema);