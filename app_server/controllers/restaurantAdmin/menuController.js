var Menu = require('../../models/menu')

/////////////////////////////////////////////       POST OPERATIONS        //////////////////////////////////////////////

exports.addMenu = (function(req, res, next) {
    Menu.create(req.body)
            .then((menu) => {
            console.log('Menu has been Added ', menu);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(menu);
        }, (err) => next(err))
        .catch((err) => next(err));
});

exports.addSubmenuToMenu = ((req, res, next) => {
    Menu.findOneAndUpdate({ _id: req.body.mid }, {
        "$push": {
            "submenus": req.body.sid
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

exports.addDealsToMenu = ((req, res, next) => {
    Menu.findOneAndUpdate({ _id: req.body.mid }, {
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

exports.viewMenu = (function(req, res, next) {
    Menu.findOne({_id:req.body._id}).exec(function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});

/////////////////////////////////////////////        GET OPERATIONS        //////////////////////////////////////////////


