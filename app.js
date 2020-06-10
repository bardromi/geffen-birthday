const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');

const app = express();

require('dotenv').config()

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.urlencoded({extended: true}));

// DB Config
const db = process.env.MONGO_URI;

console.log(db)

// Connect to MongoDB
mongoose
    .connect(db)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use('/api', indexRouter);

// Set static folder
app.use(express.static('client/build'));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})

module.exports = app;
