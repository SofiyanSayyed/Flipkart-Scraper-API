const jwt = require('jsonwebtoken')
const productModel = require('../models/productModel');
const axios = require('axios')
const cheerio = require('cheerio');
const validUrl = require('valid-url')



const scrapeData = async (req, res) => {
    try {
        let url = req.body.url
        
        if (!validUrl.isUri(url)){
          return res.status(400).send({status :false, message: "Not a valid Url"})
        }

        //Is product exists in user db
        let urlInAccount = await productModel.findOne({userId: req.decodedToken.userId, url});
        if(urlInAccount){
            return res.status(400).json({status:false, message: "Product already added"});
        }
        
        //Is product exists in db
        let urlInDb = await productModel.findOne({url});
        if(urlInDb){
            return res.status(400).json({status:false, message: "Product already exists"});
        }

        const response = await axios.get(url);

        const $ = cheerio.load(response.data);
    
        // Extracting data
        let title = $('h1 span').text();

        if(!title){
          return res.status(400).json({status: false, message: "Invalid Url/ Kindly provide Flipkart product url."})
        }

        let price = parseFloat($('div[class="_30jeq3 _16Jk6d"]').text().replace(/[^\d.-]/g, ''));

        let description = $('div[class="_1mXcCf"] > p').text();

        let reviewsAndRatings = $('div > div > span._2_R_DZ > span > span:nth-child(1)').text().replace(',', '') + "&" + $('div > div > span._2_R_DZ > span > span:nth-child(3)').text().replace(',', '');

        if(reviewsAndRatings.trim() === "&"){
          reviewsAndRatings = $("div > div._3Zuayz > div > div > span._2_R_DZ > span").text();
        }
        if(reviewsAndRatings === ""){
          reviewsAndRatings = "Error: Couldn't find reviews and ratings/(Location is different, can be resolved later.)";
        }

        let ratings = $('div[class="gUuXy- _16VRIQ"] > span > div').text()
        if(ratings === ""){
          ratings = $('div[class="gUuXy- _16VRIQ _1eJXd3"] > span > div').text();
        }
        if(ratings === ""){
          ratings = "Error: Couldn't find Ratings/(Location is different, can be resolved later.)";
        }
        let mediaCount = $('li._1Y_A6W').length;

    
        // Saving data to MongoDB
        let obj = {
          userId: req.decodedToken.userId,
          url,
          title,
          price,
          reviewsAndRatings,
          ratings,
          mediaCount,
        };

        if(description && description.length > 0) {
            obj[description] = description
        }

        let product = await productModel.create(obj);

        return res.status(201).json({status: true, data: product, message: 'Product saved successfully' });

      } catch (error) {
        res.status(500).json({status:false, message: error.message || error });
      }

}

module.exports = {scrapeData}