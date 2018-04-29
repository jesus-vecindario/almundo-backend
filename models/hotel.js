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
    amenities: [String],
    __v: { type: Number, select: false}
})

// Duplicate the ID field.
HotelSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
HotelSchema.set('toJSON', {
    virtuals: true,
    versionKey:false,
    transform: function (doc, ret) {   delete ret._id  }
});

module.exports =  mongoose.model('Hotel', HotelSchema);