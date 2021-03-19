var Restaurant = require('../../models/restaurant');

/////////////////////////////////////////////       POST OPERATIONS        //////////////////////////////////////////////

exports.findWaiter = ( function(req, res, next) {
    Restaurant.findOne({ restaurant_waiter: req.body.wid }).
    exec(function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});
