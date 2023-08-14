import express from 'express';
import router from './route/router.js';
import mongoose from 'mongoose';
const app = express();
import dotenv from 'dotenv'
dotenv.config()
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