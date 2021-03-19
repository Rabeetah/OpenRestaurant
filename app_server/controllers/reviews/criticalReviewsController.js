var express = require('express');
var router = express.Router();
var CriticalReview = require('../../models/review');

exports.createList = ( function(req, res, next) {
    CriticalReview.create(req.body)
            .then((review) => {
            console.log('Review done', review);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(review);
        }, (err) => next(err))
        .catch((err) => next(err));;

});

/* push review */
exports.add = ( function(req, res, next) {
    CriticalReview.findOneAndUpdate({ _id: req.body.cid }, {
            "$push": {
                "reviews": {
                    "review_id": req.body.rid
                }
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

/* pull review */
exports.remove = ( function(req, res, next) {
    CriticalReview.findOneAndUpdate({ _id: req.body.cid }, {
            "$pull": {
                "reviews": {
                    "review_id": req.body.rid
                }
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


/* get critical reviews list */
exports.getList = ( function(req, res, next) {
    CriticalReview.find().exec(function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });

});

/* get  critical review list */
exports.get = ( function(req, res, next) {
    CriticalReview.findOne({ _id: req.body.id }, function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });

});


