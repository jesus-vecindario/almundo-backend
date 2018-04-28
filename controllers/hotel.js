'use strict'

const Hotel = require('../models/hotel');

function getHotel(req, res) {
    const hotelId = req.params.hotelId;
    Hotel.findById(hotelId, (err, hotel) => {
        if (err) {
            return res.status(500).send({ message: 'Error getting hotel' });
        }
        if (!hotel) {
            return res.status(404).send({ message: 'Hotel not found' });
        }
        res.status(200).send({ hotel });
    });
}

function getHotels(req, res) {
    Hotel.find({}, (err, hotels) => {
        if (err) {
            return res.status(500).send({ message: 'Error getting hotels' });
        }
        if (!hotels) {
            return res.status(404).send({ message: 'Hotels not found' });
        }
        res.status(200).send({ hotels });
    });
}

function createHotel(req, res) {
    console.log("POST /api/hotels", req.body);
    console.log(" hotel.amenities", req.body.amenities);
    const hotel = new Hotel();
    hotel.name = req.body.name;
    hotel.stars = req.body.stars;
    hotel.price = req.body.price;
    hotel.image = req.body.image;
    hotel.amenities = req.body.amenities;
    hotel.save((err, hotel) => {
        if (err) {
            return res.status(500).send({ message: 'Error creating hotel' });
        }
        res.status(200).send({ hotel });
    });
}

function updateHotel(req, res) {
    const hotelId = req.params.hotelId;
    const update = req.body;
    Hotel.findByIdAndUpdate(hotelId, update, (err, hotel) => {
        if (err) {
            return res.status(500).send({ message: 'Error updating hotel' });
        }
        res.status(200).send({ hotel });
    });
}

function deleteHotel(req, res) {
    const hotelId = req.params.hotelId;
    Hotel.findByIdAndRemove(hotelId, (err, hotel) => {
        if (err) {
            return res.status(500).send({ message: `Error deleting hotel, ${err}` });
        }
        const response = {
            message: "Hotel successfully deleted",
            id: hotel._id
        };
        return res.status(200).send(response);
    });
}

module.exports = {
    getHotel,
    getHotels,
    updateHotel,
    createHotel,
    deleteHotel
}