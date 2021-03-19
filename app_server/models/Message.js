const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema for Users
const MessageSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
    },
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        default: Date.now,
    },
    sender:{
        type:String,
        required:true,
        default:"nothing"
    }
});

module.exports = Message = mongoose.model('messages', MessageSchema);
