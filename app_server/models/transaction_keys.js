var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TransactionKeySchema = new Schema({
    rest_admin: {
        type: mongoose.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    },
    publishable_key: {
        type: String,
        required: true
    },
    secret_key: {
        type: String,
        required: true
    },
    transactiontime: {
        type: Date,
        default: Date.now()
    },

});

module.exports = mongoose.model('TransactionKey', TransactionKeySchema)