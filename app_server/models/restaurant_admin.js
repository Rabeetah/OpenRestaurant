var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var restaurant_adminSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    username: {
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
    password:{
        type:String
    },    
    image: {
        data: Buffer,
        contentType: String
    },
    register_date: {
        type: Date,
        default: Date.now
    },
    restaurant: {    
        type:mongoose.Types.ObjectId,
        ref: 'Restaurant'
    }    
   
});

module.exports = mongoose.model('Restaurant_admin', restaurant_adminSchema)