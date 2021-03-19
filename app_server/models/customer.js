var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var customerSchema = new Schema({
    
    email: {
        type: String,
        required: true,
        unique: true
    },

    name: {
        type: String,
        required: true
    },

   password:{
        type:String,
        required: true
    },

    cart: {
        type: Array,
        default: []
    }
   
});

module.exports = mongoose.model('Customer', customerSchema)