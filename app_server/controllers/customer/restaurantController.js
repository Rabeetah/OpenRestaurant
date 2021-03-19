var Restaurant = require('../../models/restaurant')

/////////////////////////////////////////////        GET OPERATIONS        //////////////////////////////////////////////

exports.viewRestaurant = (function(req, res, next) {
    Restaurant.find().sort('name').exec(function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});

exports.findRestaurant = (function(req, res, next) {
    Restaurant.find({name:req.params.name}).exec(function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});


