const jwt = require('jsonwebtoken')
const productModel = require('../models/productModel');
const axios = require('axios')
const cheerio = require('cheerio');



const scrapeData = async (req, res) => {
    try {
        let url = req.body.url
        
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
        const title = $('h1 span').text();

        const price = parseFloat($('div[class="_30jeq3 _16Jk6d"]').text().replace(/[^\d.-]/g, ''));

        const description = $('div[class="_1mXcCf"] > p').text();

        const reviewsAndRatings = $('div > div:nth-child(2) > div[class="col-12-12"] > span').text().replace(',', '') + " " + $('div > div:nth-child(3) > div[class="col-12-12"] > span').text().replace(',', '');

        const ratings = $('div[class="col-12-12 _1azcI6"] > div._2d4LTz').text()

        const mediaCount = $('li._1Y_A6W').length;

    
        // Saving data to MongoDB
        const obj = {
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