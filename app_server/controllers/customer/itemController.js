var Item = require('../../models/item')

/////////////////////////////////////////////        GET OPERATIONS        //////////////////////////////////////////////

exports.findItem = (function(req, res, next) {
    Item.find({name:req.params.name}).exec(function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});

exports.getOrderItems = (function(req, res, next) {
    Item.find({orderid:req.body.orderid,itemid : req.body.itemid}).exec(function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});

