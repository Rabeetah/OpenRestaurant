var Order = require('../../models/order');
var Item = require('../../models/item');
var Deal = require('../../models/deal');
var Restaurant=require('../../models/restaurant');
const Pusher = require("pusher");
const { Parser } = require('json2csv');
const pusher = new Pusher({
    appId: "appId",
    key: "Key",
    secret: "secret",
    cluster: "cluster",
    useTLS: true
});


// exports.addOrder = (function(req, res, next) {
//     Order.create(req.body)
//             .then((order) => {
//                 pusher.trigger("rest-name", "orders", {
//                     order
//                   });                  
//             console.log('Order has been Added ', order);
//             res.statusCode = 200;
//             res.setHeader('Content-Type', 'application/json');
//             res.json(order);
//         }, (err) => next(err))
//         .catch((err) => next(err));
// });

exports.addOrder = (async (req, res, next) => {
    var rest_id = ''; var body;
    if (req.body.type == 1) {
        var type = 'card'
    }
    else {
        var type = 'cod'
    }
    await req.body.ordered_food.forEach(async (rest) => {
        rest_id = rest.id;
        body = {
            orderid: req.body.orderid,
            giftcoupon: req.body.giftcoupon,
            customer_id: req.body.customer_id,
            rest_id: rest_id,
            ordered_food: rest.rest,
            total_bill: rest.sub_total,
            comments: rest.comments,
            payment_method: type
        }
        await Order.create(body)
            .then((order) => {
                pusher.trigger(`${order.rest_id}`, "orders", {
                    order
                });
                // pusher.trigger(`${req.body.customer_id}`, "notification", {
                //     msg:`Your order ${req.body.orderid} from restaurant ${rest_id} is completed. Pick your order or wait for waiter if it was cod`
                // });
                console.log('Order has been Added ', order);
            }, (err) => next(err))
            .catch((err) => next(err));

    })
    await Order.find({ orderid: req.body.orderid }).exec(function (error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });

});

exports.viewCustomerOrder = (function (req, res, next) {
    Order.find({ orderid: req.body.orderid }).exec(function (error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});

exports.viewOrderCustomer = (function (req, res, next) {
    Order.find({ customer_id: req.body.cid, orderid: req.body.orderid }).exec(function (error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});

exports.viewAllCustomerOrders = (function (req, res, next) {
    Order.find({ customer_id: req.body.cid }).exec(function (error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});

exports.viewAllRestOrders = (function (req, res, next) {
    Order.find({ rest_id: req.body.restid }).exec(function (error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});

exports.viewAllRestOrdersCurrent = (function (req, res, next) {
    Order.find({ rest_id: req.body.restid, status: "Pending" }).exec(function (error, results) {

        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});

exports.viewAllRestOrdersPrepared = (function (req, res, next) {
    Order.find({ rest_id: req.body.restid, status: "Ready" }).exec(function (error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});

exports.viewAllRestOrdersComplete = (function (req, res, next) {
    Order.find({ rest_id: req.body.restid, status: "Complete" }).exec(function (error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data

        res.json(results);
    });
});

exports.viewOrder = (function (req, res, next) {
    Order.find({ orderid: req.body.orderId }).exec(function (error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});


exports.extractWordsOrder = (function (req, res, next) {
    Order.find({ customer_id: req.body.cid, orderid: req.body.orderId }).exec(async (error, results) => {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        let Items = [];
        // message.info('we are inside')
        if (results) {
            results.forEach(rest => {
                // console.log('c')
                rest.ordered_food.forEach(item => {
                    Items.push(item.id);
                })

            });
            var items = await Item.find({ '_id': { $in: Items } }).select('name description')
            var deals = await Deal.find({ '_id': { $in: Items } }).select('name description')
            var list = items.concat(deals);
            var StringsList = []
            list.forEach(item => {
                item.name = item.name.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase()
                item.description = item.description.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase()
                StringsList = StringsList.concat(item.name.split(' '));
                StringsList = StringsList.concat(item.description.split(' '));
            })
            res.json(StringsList);
        }
       else  res.json(null);

    });
});

exports.search = async(req, res, next)=> {
    
    var items = await Item.find({name: req.body.name}).select('_id name description')
    var deals = await Deal.find({name: req.body.name}).select('_id name description')
    var restaurants = await Restaurant.find({name: req.body.name}).select('_id name')
    var list = items.concat(deals);
    list = list.concat(restaurants);
    console.log('a'+list)
    var StringsList = []
        var list1 =[]
        list.forEach(async(item) => {
            list1=[]
            list1.push(item._id)
            console.log( 'aa'+list1)
            list1.push(item.name)
            console.log('aaa'+list1)
            item.name = item.name.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase()
            console.log('aaaa'+item.name)
            if(item.description){
                item.description = item.description.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase()
                list1.concat(item.description.split(' '));
            }
            list1.concat(item.name.split(' '))
            console.log('b'+list1)
            StringsList = StringsList.push(list1)
            console.log('ab'+list1)
            console.log('abc'+StringsList)
        })
        res.json(StringsList);
};

exports.searchFileContentHandler = async (req, res) => {
    const request = req.body;
    await Deal.find({$or: [ {$text: { $search: request.searchtext }}, {metadata: request.meta}]},
        { score: { $meta: "textScore" } }, (findErr, findRes) => {
    if (findErr) {
    //log error here
    res.status(500).send({
    message: 'Failed: to search via index',
    success: true,
    result: findErr
    });
    }
    else {
    res.send(findRes);
    }
    }).sort({ score: { $meta: "textScore" } });
};

exports.partialsearch=(function(req, res)
{
    var name1 = req.body.name;
    // Item.find({
    //     $text:{
    //         $search:name1
    //     }},
    //     {
    //         __v:0
    //     },
    //     function(err,data)
    //     {
    //         res.json(data)
    //     })
    Item.find({name:{ $regex: new RegExp(name1)}},{
        _id:0,
        __v:0,
    }, function(err,data)
    {
        res.json(data)
    }).limit(10)
})

exports.getAllOrders = (function (req, res) {
    var order = Order.find()
        .then((order) => {
            console.log("order");
            console.log(order);
            res.status(200).json(
                order
            );
        })
        .catch(err => console.log(err));
});

exports.setStatus = (function (req, res, next) {
    Order.findOneAndUpdate({ orderid: req.body.orderid, rest_id: req.body.restid }, { status: req.body.status }, { new: true }).exec(function (error, results) {
        if (error) {
            return next(error);
        }
        // if (req.body.status){

        // }
        // Respond with valid data
        res.json(results);
    });
});

exports.setDeliveredStatus = (function (req, res, next) {
    Order.findOneAndUpdate({ orderid: req.body.orderid, rest_id: req.body.restid }, { status: req.body.status, delivered: req.body.delivered }, { new: true }).exec(function (error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});

exports.waiterReadyOrders = (function (req, res, next) {
    Order.find({ rest_id: req.body.restid, status: "Ready", payment_method: 'cod', delivered: false }).exec(function (error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});

exports.waiterCompleteOrders = (function (req, res, next) {
    Order.find({ rest_id: req.body.restid, status: "Complete", delivered: true }).exec(function (error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});

exports.getOrdersForCSV = (function (req, res, next) {
    Order.find({ rest_id: req.params.restid }).exec(function (error, results) {
        if (error) {
            return next(error);
        }
        var orderData = []
        Item.find().exec(function (err, itemres) {
            if (err) {
                return next(err);
            }
            Deal.find().exec(function (err, dealres) {
                if (err) {
                    return next(err);
                }
                results.forEach(order => {
                    order.ordered_food.forEach(item => {
                        itemres.forEach(i => {
                            if (item.id == i._id) {
                                order.iid = item.id;
                                order.item_name = i.name;
                                order.price = i.price;
                                order.quantity = item.quantity;
                                orderData.push(order);
                            }
                        })
                        dealres.forEach(d => {
                            if (item.id == d._id) {
                                order.did = item.id;
                                order.deal_name = d.name;
                                order.dealprice = d.total_bill;
                                order.dealquantity = item.quantity;
                                orderData.push(order);
                            }
                        })

                    })

                })
                const fields = [
                    {
                        label: 'OrderID',
                        value: 'orderid'
                    },
                    {
                        label: 'Id',
                        value: '_id'
                    },
                    {
                        label: 'RestID',
                        value: 'rest_id'
                    },
                    {
                        label: 'ItemId',
                        value: 'iid'
                    },
                    {
                        label: 'ItemName',
                        value: 'item_name'
                    },
                    {
                        label: 'ItemPrice',
                        value: 'price'
                    },
                    {
                        label: 'ItemQuantity',
                        value: 'quantity'
                    },
                    {
                        label: 'DealId',
                        value: 'did'
                    },
                    {
                        label: 'DealName',
                        value: 'deal_name'
                    },
                    {
                        label: 'DealPrice',
                        value: 'dealtotal'
                    },
                    {
                        label: 'DealQuantity',
                        value: 'dealquantity'
                    },
                    {
                        label: 'TotalBill',
                        value: 'total_bill'
                    },
                    {
                        label: 'OrderTime',
                        value: 'ordertime'
                    },
                    {
                        label: 'Payment Method',
                        value: 'payment_method'
                    }
                ];
                // Respond with valid data
                return downloadResource(res, 'orders.csv', fields, orderData);
            })
        })
    });
});

downloadResource = (res, fileName, fields, data) => {
    const json2csv = new Parser({ fields });
    const csv = json2csv.parse(data);
    res.header('Content-Type', 'text/csv');
    res.attachment(fileName);
    return res.send(csv);
}

exports.getOrdersJSON = (async (req, res, next) =>{
    Order.find({ rest_id: req.body.restid, status: "Complete" }).exec(function (error, results) {
        if (error) {
            return next(error);
        }
        Item.find({ rest_id: req.body.restid }).exec(async (err, itemres) => {
            if (err) {
                return next(err);
            }
            Deal.find({ rest_id: req.body.restid }).exec(async (err, dealres) => {
                if (err) {
                    return next(err);
                }
                var ordersarray = [], itemsarray = []
                await results.forEach(async(order) => {
                    var o = {};
                    o.payment_method = order.payment_method
                    o.ordertime = order.ordertime
                    o.total_bill = order.total_bill
                    o.orderid = order.orderid
                    ordersarray.push(o)
                    itemsarray = itemsarray.concat(order.ordered_food)
                    console.log('ordersarray' + ordersarray)
                    console.log('itemsarray' + itemsarray)
                })
                var ItemsSummaryList = []
                var k = {};
                await itemres.forEach(async(item) => {
                    var quan = 0;
                    itemsarray.forEach(i => {
                        if (item._id == i.id) {
                            quan += i.quantity
                        }
                    })
                    k.id = item._id;
                    k.name = item.name;
                    k.price = item.price;
                    k.quantity = quan;
                    k.total = (item.price * quan)
                    ItemsSummaryList.push(k)
                    console.log('items' + ItemsSummaryList)
                    k = {}

                })
                await dealres.forEach(async(item) => {
                    var quan = 0;
                    itemsarray.forEach(i => {
                        if (item._id == i.id) {
                            quan += i.quantity
                        }
                    })
                    k.id = item._id;
                    k.name = item.name;
                    k.price = item.total_bill;
                    k.quantity = quan;
                    k.total = (item.total_bill * quan)
                    ItemsSummaryList.push(k)
                    console.log('deals' + ItemsSummaryList)
                    k = {}
                })
                var cod = 0, card = 0;
                ordersarray.forEach(async(order) => {
                    if (order.payment_method == 'cod') {
                        cod += 1
                    }
                    else {
                        card += 1
                    }
                    console.log('ccc'+cod+'ooooo'+ card)
                })



                //total no of orders
                var totalNoOfOrders = ordersarray.length

                //total amount earned by these orders
                var totalEarning = 0
                await ItemsSummaryList.forEach((item) => {
                    totalEarning = totalEarning + item.total
                    console.log('dsffsdfsdf'+totalEarning)
                })

                // Respond with valid data
               summary = {
                            totalNoOfOrders,
                            totalEarning,
                            totalCODOrders: cod,
                            totalCardOrders: card,
                            ordersarray,
                            ItemsSummaryList
                        } 
                        // res.json(summary);
                        return res.status(200).json( summary );
        

            });
        });
    });
})

exports.getOrdersByDates = (async (req, res, next) =>{
    Order.find({ rest_id: req.body.restid, status: "Complete", ordertime: {
        $gte: new Date(req.body.date1), 
        $lt: new Date(req.body.date2)
    }
 }).exec(function (error, results) {
        if (error) {
            return next(error);
        }

        Item.find({ rest_id: req.body.restid }).exec(async (err, itemres) => {
            if (err) {
                return next(err);
            }
            Deal.find({ rest_id: req.body.restid }).exec(async (err, dealres) => {
                if (err) {
                    return next(err);
                }
                var ordersarray = [], itemsarray = []
                await results.forEach(async(order) => {
                    var o = {};
                    o.payment_method = order.payment_method
                    o.ordertime = order.ordertime
                    o.total_bill = order.total_bill
                    o.orderid = order.orderid
                    ordersarray.push(o)
                    itemsarray = itemsarray.concat(order.ordered_food)
                    console.log('ordersarray' + ordersarray)
                    console.log('itemsarray' + itemsarray)
                })
                var ItemsSummaryList = []
                var k = {};
                await itemres.forEach(async(item) => {
                    var quan = 0;
                    itemsarray.forEach(i => {
                        if (item._id == i.id) {
                            quan += i.quantity
                        }
                    })
                    k.id = item._id;
                    k.name = item.name;
                    k.price = item.price;
                    k.quantity = quan;
                    k.total = (item.price * quan)
                    ItemsSummaryList.push(k)
                    console.log('items' + ItemsSummaryList)
                    k = {}

                })
                await dealres.forEach(async(item) => {
                    var quan = 0;
                    itemsarray.forEach(i => {
                        if (item._id == i.id) {
                            quan += i.quantity
                        }
                    })
                    k.id = item._id;
                    k.name = item.name;
                    k.price = item.total_bill;
                    k.quantity = quan;
                    k.total = (item.total_bill * quan)
                    ItemsSummaryList.push(k)
                    console.log('deals' + ItemsSummaryList)
                    k = {}
                })
                var cod = 0, card = 0;
                ordersarray.forEach(async(order) => {
                    if (order.payment_method == 'cod') {
                        cod += 1
                    }
                    else {
                        card += 1
                    }
                    console.log('ccc'+cod+'ooooo'+ card)
                })



                //total no of orders
                var totalNoOfOrders = ordersarray.length

                //total amount earned by these orders
                var totalEarning = 0
                await ItemsSummaryList.forEach((item) => {
                    totalEarning = totalEarning + item.total
                    console.log('dsffsdfsdf'+totalEarning)
                })

                // Respond with valid data
               summary = {
                            totalNoOfOrders,
                            totalEarning,
                            totalCODOrders: cod,
                            totalCardOrders: card,
                            ordersarray,
                            ItemsSummaryList
                        } 
                    


        return res.status(200).json(summary)
    })
})
 })

})

exports.viewAllCustomerOrdersComplete = (function(req, res, next) {
    Order.find({ customer_id: req.body.cid, status: "Complete" }).exec(function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});

exports.viewAllCustomerOrdersPending = (function(req, res, next) {
    Order.find({ customer_id: req.body.cid, status: { $in: ['Ready', 'Pending'] } }).exec(function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
});



