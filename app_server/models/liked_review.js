var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var likedReviewSchema = new Schema({
    customer: {
        type: String,
        required: true
    },
    item: {
        type: String, 
        required: true
    },
    review: {
        type: String, 
        required: true
    },
    like_dislike: {
        type: Number,
        required: true 
    },
});

module.exports = mongoose.model('LikedReview', likedReviewSchema)