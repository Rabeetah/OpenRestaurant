var mongoose = require('mongoose');
// var Cart = require('../../models/cart')
var Customer = require('../../models/customer');
var Item = require('../../models/item');
var Deal = require('../../models/deal');

/////////////////////////////////////////////       POST OPERATIONS        //////////////////////////////////////////////

// exports.addCart = (function(req, res, next) {
//     Cart.create(req.body).then((cart)=>{
//         console.log('Cart has been added', cart);
//         res.statusCode=200;
//         res.setHeader('content-type', 'application/json');
//         res.json(cart);
//       }, (err) => next(err)).catch((err)=>next(err));
// });


// router.put('/editalarm/:id/alarm/:aid', function(req, res, next) {
//     Machine.findById(req.params.id)
//          .then((machine) => {
//              res.statusCode = 200;
//              res.setHeader('Content-Type', 'application/json');
//              machine.update({'alarms.id': req.params.aid}, {'$set': {
//               'alarms.$.date': req.body.date,
//               'alarms.$.status': req.body.status
//           }}).then((result) => 
//           {
//            res.json(result);
        
//           }).catch((err) => next(err));
             
//           } ).catch((err) => next(err));
   
//    });



// exports.addItemsToCart = ((req, res, next) => {
//     // c = new Cart();
//     // quantity = c.quantity;
//     var item = '';
//     // var id = mongoose.Types.ObjectId(req.body.id);
//     try {
//         item = Cart.findOne({_id: req.body.cid, "items.item": req.body.id});
//     }
//     // console.log('hghg')
//     catch{
//         console.log('fmskdkdkd')
//     }
//     if (item){
//         console.log('hghghgjhg')
//         Cart.findById(req.body.cid)
//         .then((cart) => {
//             res.statusCode = 200;
//             res.setHeader('Content-Type', 'application/json');
//             cart.update({'items.item': req.body.id}, {'$set': {
//                 $inc: {'quantity': req.body.quantity}
//          }}).then((result) => 
//          {
//           res.json(result);
       
//          }).catch((err) => next(err));
//          }).catch((err) => next(err));
//     }
//     else{
//     Cart.findOneAndUpdate({ _id: req.body.cid }, {
//         "$push": {
//             "items": [
//                 {
//                     item: req.body.id,
//                     quantity: req.body.quantity
//                 }
//             ]
//         }
//     }, { new: true, upsert: false },
//     function(error, results) {
//         if (error) {
//             return next(error);
//         }
//         // Respond with valid data
//         res.json(results);
//     }); 
// }  
// });

// exports.addDealsToCart = ((req, res) => {
//     Cart.findOneAndUpdate({ _id: req.body.did }, {
//         "$push": {
//             "deals": [
//                 {
//                     deal: req.body.id,
//                     quantity: req.body.quantity
//                 }
//             ]
//         }
//     }, { new: true, upsert: false },
//     function(error, results) {
//         if (error) {
//             return next(error);
//         }
//         // Respond with valid data
//         res.json(results);
//     });   
// });

// exports.getCartById = (function(req, res, next) {
//     Cart.findOne({_id: req.body.id}).exec(function(error, results) {
//         if (error) {
//             return next(error);
//         }
//         // Respond with valid data
//         res.json(results);
//     });
// });


exports.addCart = function(req, res) {

    Customer.findOne({ _id: req.body.cid }, (err, userInfo) => {
        if (err){
            return err;
        }
        let duplicate = false;
        let restExist = false;
        console.log(userInfo)
        if( userInfo.cart.length > 0){
            userInfo.cart.forEach((rest) => {
                if( rest.id == (req.body.rid)){
                    restExist= true;
                    rest.rest.forEach((item) => {
                        if (item.id == req.body.iid) {
                            duplicate = true;
                            console.log(rest)
                        }
                    })
            }
            })
        }
        
        if (duplicate) {
            Customer.findOne(
                { _id: req.body.cid, "cart.id": req.body.rid})
                .exec(function(error, results) {
                            if (error) {
                                return next(error);
                            }
                    var cart = results.cart;
                    if( cart.length > 0){
                        cart.forEach((rest) => {
                            if( rest.id == (req.body.rid)){
                                rest.rest.forEach((item) => {
                                    if (item.id == req.body.iid) {
                                        item.quantity = item.quantity + req.body.quantity
                                    }
                                })
                        }
                        })
                    }
            Customer.findByIdAndUpdate({_id: req.body.cid},{cart: cart},
            { new: true, upsert: false },
                (err, userInfo) => {
                    if (err) return res.json({ success: false, err });
                    res.status(200).json(userInfo.cart)
                }
                            
            );
            
        })
    }
        else if (!restExist) { 
            Customer.findOneAndUpdate(
                { _id: req.body.cid },
                {
                    $push: {
                        cart: {
                            id: req.body.rid,
                            
                                rest:[{
                                        id: req.body.iid,
                                        quantity: req.body.quantity,
                                    }]
                                
                                                   
                            // date: Date.now()
                        }
                    }
                },
                { new: true },
                (err, userInfo) => {
                    if (err) return res.json({ success: false, err });
                    res.status(200).json(userInfo.cart)
                }
            )
        }
        else {
            Customer.findOneAndUpdate(
                { _id: req.body.cid, "cart.id": req.body.rid},
                {
                    $push: {
                        "cart.$.rest": {
                                id: req.body.iid,
                                quantity: req.body.quantity,
                        }                          
                            // date: Date.now()
                    }
                },
                { new: true },
                (err, userInfo) => {
                    if (err) return res.json({ success: false, err });
                    res.status(200).json(userInfo.cart)
                }
            )
        }
    })
};

exports.getCartItems = async(req, res) => {
    let type = req.body.type
    let productIds = req.body.id

    console.log("req.query.id", req.body.id)
    req.body.id = req.body.id.toString();
    console.log("req.query.id", req.body.id)
    if (type === "array") {
        let ids = req.body.id.split(',');
        productIds = [];
        productIds = ids.map(item => {
            return item
        }) 
    }
    console.log("productIds", productIds)
    var resp = null;
    //we need to find the product information that belong to product Id 
    await Item.find({ '_id': { $in: productIds } }).select('-image')
        .exec((err, product) => {
            if (err) {
                resp = err;
            }
            else if (product){
                resp = product
            }
            Deal.find({ '_id': { $in: productIds } }).select('-image')
            .exec((err, product) => {
                if (err) {
                    resp = err;
                }
                else if (product)
                {
                    if(product){
                        if (resp) {
                            resp = resp.concat(product)
                        }
                        else resp = product
                    }
                }
                return res.status(200).json(resp)
                
            });
        });

};

exports.removeFromCart = async(req, res) => {
    let array; let cart; 
    // let x=true;
    await Customer.findOneAndUpdate(
        { _id: req.body.cid, "cart.id": req.body.rid},
                {
                    $pull: {
                        "cart.$.rest": {
                            id: req.body.iid,
                        }                          
                            // date: Date.now()
                    }
                },
        { new: true },
        (err, userInfo) => {
            if(userInfo){
                cart = userInfo.cart;
                array = cart.map(item => {
                    return item.id
                })
                return res.status(200).json({
                    cart
                })
            }
            console.log('userInfo '+userInfo)
            return res.status(400).json({
                err : 'no item to delete found'
            })
        }
        
    )
    console.log(array)
}


exports.emptyCart = (function(req, res, next) {
    Customer.findOneAndUpdate({_id:req.body.cid}, {cart: []}).then(function() {
        Customer.findOne({_id:req.body.cid}).then(function(customer){
            console.log(customer)
             res.send(customer);
         });
    });
});


