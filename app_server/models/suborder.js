var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var suborderSchema = new Schema({
    orderid:{
        type: String,
        required:true
    },
    order : {
        type: Array,
        required: true
    },
    
});

module.exports = mongoose.model('SubOrder', suborderSchema)
