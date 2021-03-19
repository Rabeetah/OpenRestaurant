var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var helpSchema = new Schema({
    topic: {
        type: String,
        required: true
    },
    complain_details: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Help', helpSchema)