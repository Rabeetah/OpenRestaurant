var express = require('express');
var router = express.Router();
var Review = require('../../models/review');
var LikedReview = require('../../models/liked_review');
const Pusher = require("pusher");
const pusher = new Pusher({
  appId: "1114675",
  key: "98bd0af8e51670d6785d",
  secret: "e3f7e65a4e8e33458696",
  cluster: "ap2",
  useTLS: true
});


/* post reviews */
exports.addReview = ( async(req, res, next) => {
    var review = await Review.findOneAndUpdate({customer: req.body.customer, item: req.body.item},
     {date_time: Date.now(), good_review: req.body.good_review, customer_name: req.body.c_name, description: req.body.description},
     {
        new: true,
        upsert: true 
        });
    if (review){
        pusher.trigger(`${req.body.item}`, "reviews", {
            review
        });
        // if(req.body.good_review == 1){
        //     pusher.trigger(`${req.body.item}`, "bad_reviews", {
        //         review
        //     });
        // }
        // else {
        //     pusher.trigger(`${req.body.item}`, "good_reviews", {
        //         review
        //     });
        // }
    }
    res.json(review)
    
});

/* update reviews */
exports.changeReview = ( function(req, res, next) {
    Review.findOneAndUpdate({_id:req.body._id},{description:req.body.description}),function(error, results) {
    if (error) {
    return next(error);
    }
    // Respond with valid data
    res.json(results);

}});


/* remove reviews */
exports.removeReview = ( function(req, res, next) {
    Review.deleteOne({ _id: req.body.id }, function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    })});


/* get reviews */
exports.getReviews = ( function(req, res, next) {
    Review.find().exec(function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    })});


/* get  review */
exports.getReview = ( function(req, res, next) {
    Review.findOne({ _id: req.body.id }, function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
})});

/* get  all review of a customer */
exports.getReviewsCustomer = ( function(req, res, next) {
    Review.find({ customer: req.body.id }, function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
  })});

/* get  all review of an item */
exports.getReviewsItem = ( function(req, res, next) {
    Review.find({ item: req.body.id }, function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
  })});

/* get review of a customer for an item */
exports.getItemReviewCustomer = ( function(req, res, next) {
    Review.find({ customer: req.body.id, item:req.body.iid }).exec(function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
     })});

/* thumbsup */
exports.thumbsUp = ( function(req, res, next) {
    Review.findOneAndUpdate({_id:req.body._id},{ $inc: { thumbsup: 1 }}).exec(function(error, results) {
    if (error) {
    return next(error);
    }
    // Respond with valid data
    var likedreview = {
        customer: req.body.cid,
        item: req.body.itemid,
        review:req.body._id,
        like_dislike: 1
    }
    LikedReview.create(likedreview).then((liked) => {
            console.log('Liked has been Added ', liked);
            pusher.trigger(`${req.body.itemid}`, 'like_dislike', {
                liked
            });
            res.json(results);
        }, (err) => next(err))
        .catch((err) => next(err));
    
   })});


/* remove thumbsup */
exports.decThumbsUp = ( function(req, res, next) {
    Review.findOneAndUpdate({_id:req.body._id},{ $inc: { thumbsup: -1 }}).exec(function(error, results) {
    if (error) {
    return next(error);
    }
    // Respond with valid data
    var reviewliked = LikedReview.findOne({customer: req.body.cid, item: req.body.itemid, review:req.body._id})
    LikedReview.deleteOne({customer: req.body.cid, item: req.body.itemid, review:req.body._id}).exec(function(error, rest) {
    if (error) {
    return next(error);
    }
    console.log('Liked has been Deleted', reviewliked);

     pusher.trigger(`${req.body.itemid}`, 'undo_like_dislike', {
        rest
        
    });
    res.json(results);
    })
    
})});


/* thumbsdown */
exports.thumbsDown = ( function(req, res, next) {
    Review.findOneAndUpdate({_id:req.body._id},{ $inc: { thumbsdown: 1 }}).exec(function(error, results) {
    if (error) {
    return next(error);
    }
    // Respond with valid data
    var likedreview = {
        customer: req.body.cid,
        item: req.body.itemid,
        review:req.body._id,
        like_dislike: -1
    }
    LikedReview.create(likedreview).then((liked) => {
            console.log('Liked has been Added ', liked);
            pusher.trigger(`${req.body.itemid}`, 'like_dislike', {
               liked
            });
            res.json(results);
        }, (err) => next(err))
        .catch((err) => next(err));
    
})});

/* remove thumbsdown */
exports.decThumbsDown = ( function(req, res, next) {
    Review.findOneAndUpdate({_id:req.body._id},{ $inc: { thumbsdown: -1 }}).exec(function(error, results) {
    if (error) {
    return next(error);
    }
    var reviewliked = LikedReview.findOne({customer: req.body.cid, item: req.body.itemid, review:req.body._id})
    LikedReview.deleteOne({customer: req.body.cid, item: req.body.itemid, review:req.body._id}).exec(function(error, rest) {
    if (error) {
    return next(error);
    }
    console.log('Liked has been Deleted', reviewliked);

     pusher.trigger(`${req.body.itemid}`, 'undo_like_dislike', {
        rest
        
    });
    res.json(results);
    })
    // Respond with valid data
    
})});


exports.getCustomerReviewsLikedForItem = ( function(req,res,next) {
    LikedReview.find({customer: req.body.cid, item: req.body._id}).exec(function(error, result) {
    if (error) {
    return next(error);
    }
    // Respond with valid data
    res.json(result);
    })
})

