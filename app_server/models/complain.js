var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var complainSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    subject: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    complain: { 
        type: String,
        reuqired: true
    },

    customerid: {
        type: String,
        required: true
    },
    
});

module.exports = mongoose.model('Complain', complainSchema)