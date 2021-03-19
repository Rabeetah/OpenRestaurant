var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

var Transaction = require('../../models/transaction_details');
var TransactionKey = require('../../models/transaction_keys');
var Order = require('../../models/order');

/* post Transactions */
exports.saveTransaction = ( function(req, res, next) {
    Transaction.create(req.body)
            .then((Transaction) => {
            console.log('Transaction saved successfully.', Transaction);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(Transaction);
        }, (err) => next(err))
        .catch((err) => next(err));;

});

exports.saveTransactionsAll = (async(req, res, next) => {
    var orders = await Order.find({orderid: req.body.orderid})
    if(orders){
        var response = false;
        var body = ''
        await orders.forEach(async(order) => {
          body = {
              order_id: order.orderid,
              transactionid: req.body.id,
              rest_id: order.rest_id,
              amount: order.total_bill,
              name: req.body.name
          }
          await Transaction.create(body)
            .then((Transaction) => {
            console.log('Transaction saved successfully.', Transaction);
            res.statusCode = 200;
            response = true;
            res.setHeader('Content-Type', 'application/json');
        }, (err) => next(err))
        .catch((err) => next(err));;
      })
        return res.json(response);
    }
});

/* remove Transactions */
exports.removeTransaction = ( function(req, res, next) {
    Transaction.deleteOne({ _id: req.body.id }, function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    })});


/* get All Transactions */
exports.getAllTransactions = ( function(req, res, next) {
    Transaction.find().exec(function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
     })});


/* get  Transaction */
exports.getTransaction = ( function(req, res, next) {
    Transaction.findOne({ _id: req.body.id }, function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
     })});

/* get  all Transaction of a customer */
exports.getTransactionsCustomer = ( function(req, res, next) {
    Transaction.find({ customer: req.body.id }, function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
     })});

/* get  all Transaction of a restaurant */
exports.getTransactionsRestaurant = ( function(req, res, next) {
    Transaction.find({ rest_id: req.body.rest_id }, function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
     })});

exports.saveTransactionKey = ( async(req, res, next)=> {
     try {
        const salt = await bcrypt.genSalt(10);
        if (!salt) throw Error('Something went wrong with bcrypt');

        const hash = await bcrypt.hash(req.body.key1, salt);
            if (!hash) throw Error('Something went wrong hashing the key');
            
        const hash1 = await bcrypt.hash(req.body.key2, salt);
        if (!hash) throw Error('Something went wrong hashing the key');
        var body = {
            rest_admin: req.body.rest_admin,
            publishable_key: hash,
            secret_key: hash1
        }
        TransactionKey.create(body)
                .then((Transaction) => {
                console.log('Transaction saved successfully.', Transaction);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(Transaction);
            }, (err) => next(err))
            .catch((err) => next(err));;
     }
      catch (e) {
        res.status(400).json({ msg: e.message });
    }

});

/* remove Transactions */
exports.changeTransactionKey = ( function(req, res, next) {
    TransactionKey.deleteOne({ rest_admin: req.body.rest_admin }, async(error, results)=> {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        try {
            const salt = await bcrypt.genSalt(10);
            if (!salt) throw Error('Something went wrong with bcrypt');

            const hash = await bcrypt.hash(req.body.key1, salt);
            if (!hash) throw Error('Something went wrong hashing the key');

            const hash1 = await bcrypt.hash(req.body.key2, salt);
            if (!hash) throw Error('Something went wrong hashing the key');
            var body = {
                rest_admin: req.body.rest_admin,
                publishable_key: hash,
                secret_key: hash1
            }
            TransactionKey.create(body)
                    .then((Transaction) => {
                    console.log('Transaction saved successfully.', Transaction);
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(Transaction);
                }, (err) => next(err))
                .catch((err) => next(err));;
        }catch (e) {
            res.status(400).json({ msg: e.message });
        }
    })});

exports.checkKeys = ( function(req, res, next) {
    TransactionKey.findOne({ rest_admin: req.body.rest_admin }, function(error, results) {
        if (error) {
            return next(error);
        }
        return res.json(results)
    })
});