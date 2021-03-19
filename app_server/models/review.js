var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var reviewSchema = new Schema({
    customer: {
        type: String,
        required: true
    },
    item: {
        type: String, 
        required: true
    },
    description: {
        type: String,
        required: true 
    },
    thumbsup: {
        type: Number,
        default:0
        // required: true 
    },
    thumbsdown: {
        type: Number,
        default:0
        // required: true 
    },
    good_review: {
        type: Number
    }

});

module.exports = mongoose.model('Review', reviewSchema)