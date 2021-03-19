var express = require('express');
var router = express.Router();
var Rating = require('../../models/rating');
var Review = require('../../models/review');
var Item = require('../../models/item');
var Deal = require('../../models/deal');
var Order = require('../../models/order');
/* post ratings */
exports.rate = ( async(req, res, next) => {
    var rating = await Rating.findOneAndUpdate({customer: req.body.customer, item: req.body.item}, {stars: req.body.stars},{
        new: true,
        upsert: true 
        });
        
        res.json(rating)
    }
);

/* update ratings */
exports.changeRating = ( function(req, res, next) {
    Rating.findOneAndUpdate({_id:req.body._id},{stars:req.body.stars}),function(error, results) {
        if (error) {
        return next(error);
        }
        // Respond with valid data
        res.json(results);
    }
});

/* remove ratings */
exports.removeRating = ( function(req, res, next) {
    Rating.deleteOne({ _id: req.body.id }, function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    })});


/* get ratings */
exports.getRatings = ( function(req, res, next) {
    Rating.find().exec(function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
     })});


/* get  rating */
exports.getRating = ( function(req, res, next) {
    Rating.findOne({ _id: req.body.id }, function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
     })});

/* get  all rating of a customer */
exports.getRatingsCustomer = ( function(req, res, next) {
    Rating.find({ customer: req.body.id }, function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
     })});

/* get ratings of a customer for an item */
exports.getItemRatingsCustomer = ( function(req, res, next) {
    Rating.find({ customer: req.body.id, item:req.body.iid }, function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
     })});

/* get  all rating of an item */
exports.getRatingsItem = ( function(req, res, next) {
    Rating.find({ item: req.body.id }, function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
     })});

/* get ratings of an item */
exports.getRatingsCount = ( function(req, res, next) {
    Rating.find({ item: req.body.id }, async(error, results) => {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        var count, avg_rating = 0;
        if(res ==[]) res.json({
            count: 0,
            avg_rating: 0
        });
        else {
            await results.forEach(ratings => {
                avg_rating = avg_rating + ratings.stars;
            })
            count = results.length;
            avg_rating = avg_rating/count;
            res.json(count, avg_rating)
        }
     })});

/* get average ratings of all items */
exports.getRatingsAll = ( async(req, res, next) => {
    var ratings = await Rating.find({});
    var items = await Item.find({}).select('-image');
    var deals = await Deal.find({}).select('-image');
    var count = 0;
    var avg_rating = 0;
    var it={}
    await items.forEach((item, i) => {
        count = 0; 
        avg_rating = 0;
        it={}
        it._id = item._id;
        it.name = item.name;
        it.description = item.description;
        it.price = item.price;
        it.avg_rating = 0;
        it.count = 0;
        ratings.forEach((rating) => {
            if(rating.item == item._id) {
                avg_rating = avg_rating + rating.stars
                count = count + 1
            }
        })
        if(count) avg_rating = avg_rating/count;
        it.avg_rating = avg_rating;
        it.count = count;
        items[i] = it;
    })
    await deals.forEach(async(item, i) => {
        count = 0; 
        avg_rating = 0;
        it={}
        it._id = item._id;
        it.name = item.name;
        it.description = item.description;
        it.total_bill = item.total_bill;
        it.avg_rating = 0;
        it.count = 0;
        ratings.forEach((rating) => {
            if(rating.item == item._id) {
                avg_rating = avg_rating + rating.stars
                count = count + 1
            }
        })
        if(count) avg_rating = avg_rating/count;
        it.avg_rating = avg_rating;
        it.count = count;
        deals[i] = it;
    })
    await res.json({
        items,deals
    })
});

/* get average ratings of all items */
exports.getRatingsPlusReviewsCustomerOrder = ( async(req, res, next) => {
    let type = req.body.type
    let productIds = req.body.id
    req.body.id = req.body.id.toString();
    if (type === "array") {
        let ids = req.body.id.split(',');
        productIds = [];
        productIds = ids.map(item => {
            return item
        }) 
    }
    var ratings = await Rating.find({ customer: req.body.cid, 'item': { $in: productIds } });
    var reviews = await Review.find({ customer: req.body.cid, 'item': { $in: productIds } });
    var items = await Item.find({ '_id': { $in: productIds } }).select('-image');
    var deals = await Deal.find({ '_id': { $in: productIds } }).select('-image');
    items = items.concat(deals);
    var it={}
    await items.forEach((item, i) => {
        it={}
        it._id = item._id;
        it.name = item.name;
        it.description = item.description;
        if(item.price) it.price = item.price;
        else it.total_bill = item.total_bill;
        it.rest_id = item.rest_id;
        it.rating = 0;
        it.review = '';
        ratings.forEach((rating) => {
            if(rating.item == item._id) {
                it.rating = rating.stars
            }
        })
        reviews.forEach((review) => {
            if(review.item == item._id) {
                it.review = review.description;
            }
        })
        items[i] = it;
    })
    await res.json({
        items
    })
});

/* get average ratings and reviews of item */
exports.getRatingsPlusReviewsItem = ( async(req, res, next) => {
    if(req.body.item) {
        var item = await Item.findOne({ _id: req.body.item }).select('-image');
        var ratings = await Rating.find({ item: req.body.item });
        var reviews = await Review.find({ item: req.body.item });
    }
    else if (req.body.deal) {
        var item = await Deal.findOne({ _id: req.body.deal }).select('-image');
        var ratings = await Rating.find({ item: req.body.deal });
        var reviews = await Review.find({ item: req.body.deal });
    }
    if(req.body.deal || req.body.item){
        var it={};
        var avg_rating = 0;
        var count = 0;
        var ireviews = [];
        it._id = item._id;
        it.name = item.name;
        it.description = item.description;
        if(item.price) it.price = item.price;
        else it.total_bill = item.total_bill;
        it.rest_id = item.rest_id;
        it.avg_rating = 0;
        it.count = 0;
        it.reviews = [];
        ratings.forEach((rating) => {
                if(rating.item == item._id) {
                    avg_rating = avg_rating + rating.stars
                    count = count + 1
                }
            })
        if(count) avg_rating = avg_rating/count;
        it.avg_rating = avg_rating;
        it.count = count;
        reviews.forEach((review) => {
            if(review.item == item._id) {
                if(!review.good_review) review.good_review = -1
                ireviews.push({
                    _id:review._id,
                    c_name:review.customer_name,
                    review:review.description,
                    likes:review.thumbsup,
                    dislikes:review.thumbsdown,
                    good_review: review.good_review,
                    date_time: review.date_time
                });
            }
        })
        it.reviews = ireviews;
        await res.json(
            it
        )
    }
    return null;
});

exports.Suggest = async (req,res,next) => {
    var orders = await Order.find({customer_id: req.body.user_id}).select('ordered_food')
    var rated = await Rating.find({customer: req.body.user_id, stars: {$in : [4,4.5,5] }}).select('item')
    var reviews = await Review.find({customer: req.body.user_id, good_review: 1}).select('item')
    var items= []
    var suggestions = []
    await orders.forEach(order => {
        order.ordered_food.forEach(o => {
            items.push(o.id)
        })
    })
    items = items.concat(reviews)
    items = items.concat(rated)
    var counts = {}
    for (var i = 0; i < items.length; i++) {
        var num = items[i];
        counts[num] = counts[num] ? counts[num] + 1 : 1;
        if(counts[num]> 3) suggestions.push(items[i])
    }
    var ratings = await Rating.find({item: {$in: suggestions}});
    var items = await Item.find({_id:  {$in: suggestions}}).select('-image');
    var deals = await Deal.find({_id:  {$in: suggestions}}).select('-image');
    var count = 0;
    var avg_rating = 0;
    var it={}
    await items.forEach((item, i) => {
        count = 0; 
        avg_rating = 0;
        it={}
        it._id = item._id;
        it.name = item.name;
        it.description = item.description;
        it.price = item.price;
        it.avg_rating = 0;
        it.count = 0;
        ratings.forEach((rating) => {
            if(rating.item == item._id) {
                avg_rating = avg_rating + rating.stars
                count = count + 1
            }
        })
        if(count) avg_rating = avg_rating/count;
        it.avg_rating = avg_rating;
        it.count = count;
        items[i] = it;
    })
    await deals.forEach(async(item, i) => {
        count = 0; 
        avg_rating = 0;
        it={}
        it._id = item._id;
        it.name = item.name;
        it.description = item.description;
        it.total_bill = item.total_bill;
        it.avg_rating = 0;
        it.count = 0;
        ratings.forEach((rating) => {
            if(rating.item == item._id) {
                avg_rating = avg_rating + rating.stars
                count = count + 1
            }
        })
        if(count) avg_rating = avg_rating/count;
        it.avg_rating = avg_rating;
        it.count = count;
        deals[i] = it;
    })
    items = await items.concat(deals)
    await res.json({
        items
    })
}