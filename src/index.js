const express = require('express');
const router = require('./route/router.js')
const mongoose = require('mongoose');
const app = express();
require('dotenv').config()
const { MONGO_STRING, PORT } = process.env

app.use(express.json())

app.use('/', router)

mongoose.connect(MONGO_STRING, {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err.message))

app.listen(PORT || 3000, () => {
    console.log('listening on port:', PORT || 3000)
})