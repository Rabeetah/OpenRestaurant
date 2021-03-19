var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var dealSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    image: {
        data: Buffer,
        contentType: String
    },

    description: {
        type: String,
    },

    total_bill: {
        type: Number,
        required: true
    },
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

module.exports = mongoose.model('Deal', dealSchema)