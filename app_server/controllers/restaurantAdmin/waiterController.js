var Waiter = require('../../models/waiter')

/////////////////////////////////////////////       POST OPERATIONS        //////////////////////////////////////////////

exports.addWaiter = (function(req, res, next) {
    Waiter.create(req.body).then((waiter)=>{
        console.log('waiter has been added', waiter);
        res.statusCode=200;
        res.setHeader('content-type', 'application/json');
        res.json(waiter);
      }, (err) => next(err)).catch((err)=>next(err));
});

/////////////////////////////////////////////        GET OPERATIONS        //////////////////////////////////////////////

exports.viewWaiter = (function(req, res, next) {
    Waiter.find().sort('username').exec(function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});

///////////////////////////////////////////        DELETE OPERATIONS        //////////////////////////////////////////////

exports.removeWaiter = (function(req, res, next) {
    Waiter.deleteOne({ _id: req.params.id }, function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});
