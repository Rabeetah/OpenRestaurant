var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var checkoutSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phonenumber: {
        type: Number,
        required: true,
        unique: true
    },
    giftcoupon: {
        type: String,
    },
});

module.exports = mongoose.model('Checkout', checkoutSchema)