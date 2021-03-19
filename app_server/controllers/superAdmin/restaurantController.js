var Restaurant = require('../../models/restaurant')

/////////////////////////////////////////////       POST OPERATIONS        //////////////////////////////////////////////

exports.addRestaurant = (function(req, res, next) {
    Restaurant.create(req.body).then((restaurant)=>{
        console.log('restaurant has been added', restaurant);
        res.statusCode=200;
        res.setHeader('content-type', 'application/json');
        res.json(restaurant);
      }, (err) => next(err)).catch((err)=>next(err));
  });

/////////////////////////////////////////////        GET OPERATIONS        //////////////////////////////////////////////

exports.viewRestaurant = (function(req, res, next) {
    Restaurant.find({}).populate('restaurant_admin').exec(function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});

exports.viewRestaurantById = (function(req, res, next) {
    Restaurant.find({}).populate('restaurant_admin').exec(function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});

///////////////////////////////////////////        DELETE OPERATIONS        //////////////////////////////////////////////

exports.removeRestaurant = (function (req, res, next) {
    Restaurant.deleteOne({ _id: req.params.id }, function (error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});

/////////////////////////////////////////////        PUT OPERATIONS        //////////////////////////////////////////////

exports.editRestaurant = (function(req, res, next) {
    Restaurant.findByIdAndUpdate({_id:req.params.rid}, req.body).then(function() {
        Restaurant.findOne({_id:req.params.rid}).then(function(Restaurant){
            res.send(Restaurant);
        });
    });
});

exports.editRestaurantAndRestaurantAdmin = ( function(req, res, next) {
    Restaurant.findOneAndUpdate({ _id: req.params.rid }, { restaurant_admin: req.params.raid }, function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});

