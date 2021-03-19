var Staff = require('../../models/staff')
  
/////////////////////////////////////////////        GET OPERATIONS        //////////////////////////////////////////////

exports.viewStaffProfile = (function(req, res, next){
    console.log(req.params.id);
    Staff.findById(req.params.id)
        .then((staff) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(staff);
        }, (err) => next(err))
        .catch((err) => next(err));
});

