var Submenu = require('../../models/submenu')

/////////////////////////////////////////////       POST OPERATIONS        //////////////////////////////////////////////

exports.addSubmenu = (function(req, res, next) {
    Submenu.create(req.body).then((submenu)=>{
        console.log('Submenu has been added', submenu);
        res.statusCode=200;
        res.setHeader('content-type', 'application/json');
        res.json(submenu);
      }, (err) => next(err)).catch((err)=>next(err));
});

exports.addItemsToSubmenu = ((req, res, next) => {
    Submenu.findOneAndUpdate({ _id: req.body.cid }, {
        "$push": {
            "items": req.body.rid
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

exports.addDealsToSubmenu = ((req, res) => {
    Submenu.findOneAndUpdate({ _id: req.body.sid }, {
        "$push": {
            "deals": req.body.did
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

exports.getSubmenuById = (function(req, res, next) {
    Submenu.findOne({_id: req.body.id}).exec(function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});

///////////////////////////////////////////        DELETE OPERATIONS        //////////////////////////////////////////////

exports.removeItemFromSubmenu = ((req, res) => {
    Submenu.findOneAndUpdate({ _id: req.body.cid }, {
        "$pull": {
                "items": req.body.rid
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

exports.removeSubmenu= (function(req, res, next) {
    Submenu.deleteOne({ _id: req.params.id }, function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});

///////////////////////////////////////////        PUT OPERATIONS        /////////////////////////////////////////////

exports.editSubmenu = (function(req, res, next) {
    Submenu.findByIdAndUpdate({_id:req.params.sid}, req.body).then(function() {
        Submenu.findOne({_id:req.params.sid}).then(function(Item){
             res.send(Item);
         });
    });
});

