var Checkout = require('../../models/checkout')

/////////////////////////////////////////////       POST OPERATIONS        //////////////////////////////////////////////

exports.proceedCheckout = (function(req, res, next) {
    Checkout.create(req.body).then((checkout)=>{
        console.log('Checkout', checkout);
        res.statusCode=200;
        res.setHeader('content-type', 'application/json');
        res.json(checkout);
      }, (err) => next(err)).catch((err)=>next(err));
});