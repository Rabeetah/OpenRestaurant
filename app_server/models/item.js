var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var itemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        data: Buffer,
        contentType: String
        // type: String
    },
    description: {
        type: String,
         
    },
    // ratings: [
    //     {
    //         type: mongoose.Types.ObjectId,
    //         ref: 'Rating'
    //     }
    // ],
    ratings: 
    {
        type: Number,
    },
    rating_count: 
    {
        type: Number,
    },
    reviews: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Review'
        }
    ],
    rest_id:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Item', itemSchema)