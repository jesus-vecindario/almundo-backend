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

module.exports = app;