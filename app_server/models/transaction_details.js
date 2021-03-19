var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TransactionSchema = new Schema({
    transactionid:{
        type: String,
        required:true
    },
    order_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    rest_id: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    transactiontime: {
        type: Date,
        default: Date.now()
    },

});

module.exports = mongoose.model('Transaction', TransactionSchema)