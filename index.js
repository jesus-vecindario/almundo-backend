'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

const Hotel = require('./models/hotel');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api/hotels', (req, res)=> {
    Hotel.find({}, (err, hotels) => {
        if (err) {
            return res.status(500).send({ message: 'Error getting hotels' });
        }
        if (!hotels) {
            return res.status(404).send({ message: 'Hotels not found' });
        }
        res.status(200).send({ hotels });
    });
});

app.get('/api/hotels/:hotelId', (req, res) => {
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
});

app.post('/api/hotels', (req, res)=> {
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
    })
})

app.put('/api/hotels/:hotelId', (req, res)=> {
    const hotelId = req.params.hotelId;
    const update = req.body;
    Hotel.findByIdAndUpdate(hotelId, update, (err, hotel) => {
        if (err) {
            return res.status(500).send({ message: 'Error updating hotel' });
        }
        res.status(200).send({ hotel });
    });
});

app.delete('/api/hotels/:hotelId', (req, res)=> {
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
});

mongoose.connect('mongodb://localhost:27017/almundo', (err, res) => {
    if (err) throw err
    console.log("Connection established")
    app.listen(3000, () => {
        console.log(`API REST ${port}`)
    });
})

