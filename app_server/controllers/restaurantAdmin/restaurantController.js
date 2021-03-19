var Restaurant = require('../../models/restaurant');

/////////////////////////////////////////////       POST OPERATIONS        //////////////////////////////////////////////

exports.findRestaurant = ( function(req, res, next) {
    Restaurant.findOne({ restaurant_admin: req.body.rid }).populate({path:'menu', select:'submenus'}).
    exec(function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});



exports.addWaiterToRestaurant = ((req, res, next) => {
    Restaurant.findOneAndUpdate({ _id: req.body.restid }, {
        "$push": {
            "restaurant_waiter": req.body.wid
        }
    }, { new: true, upsert: false },
    function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });   
});

exports.addStaffToRestaurant = ((req, res, next) => {
    Restaurant.findOneAndUpdate({ _id: req.body.restid }, {
        "$push": {
            "restaurant_staff": req.body.sid
        }
    }, { new: true, upsert: false },
    function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });   
});

/////////////////////////////////////////////        PUT OPERATIONS        //////////////////////////////////////////////

exports.addMenuToRestaurant = ( function(req, res, next) {
    Restaurant.findOneAndUpdate({ _id: req.params.rid }, { menu: req.params.mid }). then(function() {
        Restaurant.findOne({_id:req.params.rid}).then(function(Restaurant){
            res.send(Restaurant);
        });
    });
});

/////////////////////////////////////////////        GET OPERATIONS        /////////////////////////////////////////////

exports.getRestaurantById = (function(req, res, next) {
    Restaurant.findOne({_id: req.body.id}).populate({path:'menu', select:'submenus'}).exec(function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});