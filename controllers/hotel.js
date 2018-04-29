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
        res.status(200).send( hotel );
    });
}

function getHotels(req, res) {
    const { name, stars } = req.query;
    let filter = name ? { name } : stars ? { stars } : {};
    Hotel.find( filter , (err, hotels) => {
        if (err) {
            return res.status(500).send({ message: 'Error getting hotels' });
        }
        if (!hotels) {
            return res.status(404).send({ message: 'Hotel not found' });
        }
        res.status(200).send( hotels );
    });
}

function createHotel(req, res) {
    const hotel = new Hotel();
    const { name, stars, price, image, amenities } = req.body;
    hotel.name = name;
    hotel.stars = stars;
    hotel.price = price;
    hotel.image = image;
    hotel.amenities = amenities;
    hotel.save((err, hotel) => {
        if (err) {
            return res.status(500).send({ message: 'Error creating hotel' });
        }
        res.status(200).send( hotel );
    });
}

function updateHotel(req, res) {
    const hotelId = req.params.hotelId;
    const update = req.body;
    Hotel.findByIdAndUpdate(hotelId, update, (err, hotel) => {
        if (err) { 
            return res.status(500).send({ message: 'Error updating hotel' });
        }
        res.status(200).send( hotel );
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