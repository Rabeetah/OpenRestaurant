var mongoose = require('mongoose');
var mongooseAutopopulate = require("mongoose-autopopulate")
var Schema = mongoose.Schema;
var menuSchema = new Schema({
    submenus: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'SubMenu',
            autopopulate: true
        }
    ],
    deals: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Deal',
            autopopulate: { select: '-image' }
        }
    ],

});

menuSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('Menu', menuSchema)