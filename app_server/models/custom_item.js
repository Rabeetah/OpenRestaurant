var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var customitemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true 
    },
    additionals:  [
        {
            sets: {
                type: mongoose.Types.ObjectId,
                ref: 'choiceOption'
            }
        }
    ],
    add_ons:  [
        {
            sets: [
                {
                    title: {
                        type: String,
                        required: true,
                    },
                    quantity:{
                        type:Number,
                    },
                    size:{
                        type:Number,
                    },
                    price:{
                        type:Number,
                        required: true,
                    }
                }
            ],
        }
    ],
    ratings: [
        {
            rating: {
                type: mongoose.Types.ObjectId,
                ref: 'Rating'
            }
        }
    ],
    reviews: [
        {
            review: {
                type: mongoose.Types.ObjectId,
                ref: 'Review'
            }
        }
    ],

});

module.exports = mongoose.model('customItem', customitemSchema)