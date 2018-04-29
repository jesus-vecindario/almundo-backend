'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const router = require('./routes/index');
const routerHotels = require('./routes/hotels');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/', router);
app.use('/api/hotels', routerHotels);

app.use((err, req, res, next) => {
    if (err.message.match(/not found/)) {
        return res.status(404).send({ error: err.message })
    }

    res.status(500).send({ error: err.message })
})

module.exports = app;