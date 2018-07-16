'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const hbs = require('express-handlebars');

const router = require('./routes/index');
const routerHotels = require('./routes/hotels');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('.hbs', hbs({
    defaultLayout: 'default',
    extname: ".hbs"
}));

app.set('view engine', '.hbs');

app.use('/api/', router);
app.use('/api/hotels', routerHotels);

app.get('/login', (req, res) => {
    res.render("login")
});

app.use((err, req, res, next) => {
    if (err.message.match(/not found/)) {
        return res.status(404).send({ error: err.message })
    }

    res.status(500).send({ error: err.message })
})

module.exports = app;