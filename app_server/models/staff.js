var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var staffSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
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
    password: {
        type: String,
        required: true
    },
    image: {
        data: Buffer,
        contentType: String
    },
    register_date: {
        type: Date,
        default: Date.now
    },
    rest_id: {
        type: String,
        required: true
    },
    orders: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Order'
            
        }
    ], 
    is_customer_support: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Staff', staffSchema)