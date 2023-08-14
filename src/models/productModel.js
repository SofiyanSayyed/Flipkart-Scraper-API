const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        trim: true
    },
    url: {
        type: String,
        trim: true
    },
    price: String,
    description: {
        type: String,
        trim: true
    },
    reviewsAndRatings: {
        type: String,
    },
    ratings: {
        type: String,
    },
    mediaCount: {
        type: String,
    },
  });

module.exports = mongoose.model('Product', productSchema);