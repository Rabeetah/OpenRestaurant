var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var choiceOptionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true 
    },
    options: [
        {
            name: {
                type:String,
                required: true
            },
            selected: {
                type: Boolean,
                default: false,
            }
        }
    ],
    max_select:{
        name: {
            type:Number,
            required: true,
            default: 1
        },
    },
});

module.exports = mongoose.model('choiceOption', choiceOptionSchema)