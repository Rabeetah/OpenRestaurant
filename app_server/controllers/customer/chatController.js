var _ = require("lodash");
var formidable = require("formidable");
var fs = require("fs");
var Customer = require("../../models/customer");
var Message = require('../../models/Message')
var mongoose = require('mongoose')

const Pusher = require("pusher");

const pusher = new Pusher({
    appId: "appId",
    key: "key",
    secret: "secret",
    cluster: "cluster",
    useTLS: true
});

// Get messages from conversation
// based on to & from
exports.conversationquery = (req, res, next) => {
    let user1 = mongoose.Types.ObjectId(req.body.customer);
    let user2 = mongoose.Types.ObjectId(req.body.restaurant);

    Message.aggregate([
        {
            $lookup: {
                from: 'customers',
                localField: 'customer',
                foreignField: '_id',
                as: 'cusObj',
            },
        },
        {
            $lookup: {
                from: 'restaurant',
                localField: 'restaurant',
                foreignField: '_id',
                as: 'resObj',
            },
        },
    ])
        .match({
             $and: [{ customer: user1 }, { restaurant: user2 }]  
        })
        .project({
            'cusObj.password': 0,
            'cusObj.__v': 0,
            'cusObj.date': 0,
            'resObj.password': 0,
            'resObj.__v': 0,
            'resObj.date': 0,
        })
        .exec((err, messages) => {
            if (err) {
                console.log(err);
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ message: 'Failure' }));
                res.sendStatus(500);
            } else {
                console.log(messages.length,"loaded.")
                res.json(messages);
            }
        });
}

// Post private message
exports.sendmessage = (req, res, next) => {
    console.log(req.body)
    let message = new Message({
        customer: req.body.customer,
        restaurant: req.body.restaurant,
        body: req.body.body,
        sender:req.body.sender
    });
    // await Order.create(body)
    //         .then((order) => {
    //             pusher.trigger(`${order.rest_id}`, "orders", {
    //                 order
    //             });
    //             console.log('Order has been Added ', order);
    //         }, (err) => next(err))
    //         .catch((err) => next(err));

    message.save()
    .then((mes)=>{   
        console.log(mes.restaurant)
            pusher.trigger(`${mes.restaurant}`, "messages", {
               message
            });
            console.log('New message');
            res.setHeader('Content-Type', 'application/json');
            res.end(
                JSON.stringify({
                    message: 'Success'
                })
            );

    })
    .catch((err)=>{
            console.log(err);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ message: 'Failure' }));
            res.sendStatus(500);
    })
    

}

exports.allmessages = (function(req, res, next) {
    Message.find({}).exec(function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});

exports.getCustomers =  (req, res) => {
    console.log("lll")
    id = mongoose.Types.ObjectId(req.body.id)
    try{
        Message.find({restaurant:id})
        .then((user) => {
            ids = []
            for(var i=0; i<user.length; i++){
                ids.push(user[i].customer)
            }
            let unique = {};
            ids.forEach(function(i) {
                if(!unique[i]) {
                unique[i] = true;
                }
            });
            var u =  Object.keys(unique);
            console.log(u)
            console.log("kkkkkk")
            var resp = null;
            Customer.find({ '_id': { $in: u } })
            .exec((err, product) => {
                if (err) {
                    resp = err;
                }
                else if (product)
                {
                    if(product){
                        if (resp) {
                            resp = resp.concat(product)
                        }
                        else resp = product
                    }
                }
                console.log(resp)
                return res.status(200).json(resp)
                
            });
          
        });
    }
    catch (e) {
        console.log(e)
        res.status(400).json({ error: e.message });
      }
  }