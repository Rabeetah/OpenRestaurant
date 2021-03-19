var Staff = require('../../models/staff')

/////////////////////////////////////////////       POST OPERATIONS        //////////////////////////////////////////////

exports.addStaff = ( function(req, res, next) {
    Staff.create(req.body).then((staff)=>{
        console.log('staff has been added', staff);
        res.statusCode=200;
        res.setHeader('content-type', 'application/json');
        res.json(staff);
      }, (err) => next(err)).catch((err)=>next(err));
});

/////////////////////////////////////////////        GET OPERATIONS        //////////////////////////////////////////////

exports.viewStaff = (function(req, res, next) {
    Staff.find().sort('username').exec(function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});

///////////////////////////////////////////        DELETE OPERATIONS        //////////////////////////////////////////////

exports.removeStaff = (function(req, res, next) {
    Staff.deleteOne({ _id: req.params.id }, function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});