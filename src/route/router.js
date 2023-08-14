const express = require('express');
const axios = require('axios');
const router = express.Router()
const {signupUser, loginUser} = require('../controller/userController.js');
const {scrapeData} = require('../controller/productController.js');
const {authentication}= require('../middleware/auth.js');

router.post('/signup', signupUser)
router.post('/login', loginUser)
router.post('/addProduct',authentication, scrapeData)



router.all('/*', async (req, res) => {
    return res.status(404).json({ status: false, message: "Invalid request" })
})

module.exports = router