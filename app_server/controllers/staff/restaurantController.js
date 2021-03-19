var Restaurant = require('../../models/restaurant');

/////////////////////////////////////////////       POST OPERATIONS        //////////////////////////////////////////////

exports.findStaff = ( function(req, res, next) {
    Restaurant.findOne({ restaurant_staff: req.body.sid }).
    exec(function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});
