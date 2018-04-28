'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HotelSchema = Schema({
    name: { 
        type: String, 
        trim: true 
    },
    stars: { 
        type: Number, 
        min: 0, max: 5 
    },
    price:{ 
        type: Number, 
        min: 0 
    },
    image: { 
        type: String, 
        trim: true, lowercase: true 
    },
    amenities: [String]
})

module.exports =  mongoose.model('Hotel', HotelSchema);