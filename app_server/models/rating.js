var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ratingSchema = new Schema({
    customer: {
        type: String,
        required: true
    },
    item: {
        type: String, 
        required: true
    },
    stars: {
        type: Number,
        required: true ,
        min: 0.5,
        max: 5
    },
});

module.exports = mongoose.model('Rating', ratingSchema)