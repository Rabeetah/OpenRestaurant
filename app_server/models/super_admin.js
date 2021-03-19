var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var superAdminSchema = new Schema({
    username: {
        type: String,
        required: true
    }, 
});

superAdminSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('SuperAdmin', superAdminSchema)