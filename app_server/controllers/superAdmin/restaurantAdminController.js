var Restaurant_admin = require('../../models/restaurant_admin')

/////////////////////////////////////////////       POST OPERATIONS        //////////////////////////////////////////////

exports.addRestaurantAdmin = (function(req, res, next) {
    Restaurant_admin.create(req.body).then((restaurant_admin)=>{
        console.log('Restaurant Admin has been added', restaurant_admin);
        res.statusCode=200;
        res.setHeader('content-type', 'application/json');
        res.json(restaurant_admin);
    }, (err) => next(err)).catch((err)=>next(err));
});

/////////////////////////////////////////////        GET OPERATIONS        //////////////////////////////////////////////

exports.viewRestaurantAdmin = (function(req, res, next) {
    Restaurant_admin.find().sort('username').exec(function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});

exports.viewRestauranAdminById = (function(req, res, next) {
    Restaurant_admin.findById(req.params.id)
        .then((restaurant_admin) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(restaurant_admin);
        }, (err) => next(err))
        .catch((err) => next(err));
});

///////////////////////////////////////////        DELETE OPERATIONS        //////////////////////////////////////////////

exports.removeRestaurantAdmin = (function(req, res, next) {
    Restaurant_admin.deleteOne({ _id: req.params.id }, function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid datas
        res.json(results);
    });
});

/////////////////////////////////////////////        PUT OPERATIONS        //////////////////////////////////////////////

exports.editRestaurantAdmin = (function(req, res, next) {
    Restaurant_admin.findByIdAndUpdate({_id:req.params.raid}, req.body).then(function() {
        Restaurant_admin.findOne({_id:req.params.raid}).then(function(Restaurant_admin){
            res.send(Restaurant_admin);
        });
    });
});
