var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var cartSchema = new Schema({
    // items: [
    //     {
    //         // id:{
    //         //     type: String,
    //         //     required: true
    //         // },
    //         item: {
    //             type: mongoose.Types.ObjectId,
                
    //         },
    //         quantity: {
    //             type: Number,
    //             required: true
    //         },
    //     }
    // ],
    // deals: [
    //     {
    //         deal: {
    //             type: mongoose.Types.ObjectId,
    //             ref: 'Deal'
    //         },
    //         quantity: {
    //             type: Number,
    //             required: true
    //         },
    //     }
    // ], 
    // total_bill: {
    //     type: Number,
    //     required: true
    // }

    customer_id : {
        type: String,
        required: true
    },

    cart : {
        type: Array,
        default: []
    }
   
});

module.exports = mongoose.model('Cart', cartSchema)