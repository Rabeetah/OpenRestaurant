var Order = require('../../models/order')
  
/////////////////////////////////////////////        GET OPERATIONS        //////////////////////////////////////////////

exports.viewOrder = (function(req, res, next){
    Order.findById(req.params.id)
        .then((order) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(order);
        }, (err) => next(err))
        .catch((err) => next(err));
});
