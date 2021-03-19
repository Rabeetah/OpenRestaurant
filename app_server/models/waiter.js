var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var waiterSchema = new Schema({
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
    orders: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Order'
        }
    ],
    rest_id: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Waiter', waiterSchema)