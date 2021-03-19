var Waiter = require('../../models/waiter')
var Order = require('../../models/order')

/////////////////////////////////////////////       POST OPERATIONS        //////////////////////////////////////////////

exports.acceptOrder = (function(req, res, next) {
    Order.findById(req.params.oid)
    .then((order) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(order);
    }, (err) => next(err))
    .catch((err) => next(err));
    Waiter.find({_id : req.params.wid}).populate(order).exec(function(error, results) {
        if (error) {
            return next(error);
        }
        res.json(results);
    });
});

exports.findWaiter = ( function(req, res, next) {
    Waiter.findOne({ waiter: req.body.wid }).
    exec(function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});
  
/////////////////////////////////////////////        GET OPERATIONS        //////////////////////////////////////////////

exports.viewWaiterProfile = (function(req, res, next){
    console.log(req.params.id);
    Waiter.findById(req.params.id)
        .then((waiter) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(waiter);
        }, (err) => next(err))
        .catch((err) => next(err));
});

/////////////////////////////////////////////        PUT OPERATIONS        //////////////////////////////////////////////

exports.editNameInSetting = (function(req, res, next) {
    Waiter.findOneAndUpdate({_id:req.params.wid},{name:req.params.name},function(error, results) {
    if (error) {
    return next(error);
    }
    res.json(results);
    });
});

exports.editUsernameInSetting = (function(req, res, next) {
    Waiter.findOneAndUpdate({_id:req.params.wid},{username:req.params.username},function(error, results) {
    if (error) {
    return next(error);
    }
    res.json(results);
    });
});

exports.editEmailInSetting = ( function(req, res, next) {
    Waiter.findOneAndUpdate({_id:req.params.wid},{email:params.body.email},function(error, results) {
    if (error) {
    return next(error);
    }
    res.json(results);
    });
});

exports.editPhonenumberInSetting = (function(req, res, next) {
    Waiter.findOneAndUpdate({_id:req.params.wid},{phonenumber:req.params.phonenumber},function(error, results) {
    if (error) {
    return next(error);
    }
    res.json(results);
    });
});

exports.editPasswordInSetting = (function(req, res, next) {
    Waiter.findOneAndUpdate({_id:req.params.wid},{password:req.params.password},function(error, results) {
    if (error) {
    return next(error);
    }
    res.json(results);
    });
});

exports.editStatusInSetting = (function(req, res, next) {
    Waiter.findOneAndUpdate({_id:req.params.wid},{status:req.params.status},function(error, results) {
    if (error) {
    return next(error);
    }
    res.json(results);
    });
});

exports.editPictureInSetting = (function(req, res, next) {
    Waiter.findOneAndUpdate({_id:req.params.wid},{picture:req.params.picture},function(error, results) {
    if (error) {
    return next(error);
    }
    res.json(results);
    });
});
