var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
var SuperAdmin = require('../../models/super_admin');
var passport = require('passport');
var authenticate = require('../../../authenticate');
var bcrypt = require('bcryptjs');
router.use(bodyParser.json());

/* GET users listing. */
exports.allusers = ( function(req, res, next) {
    SuperAdmin.find({})
        .then((user) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(user);
        }, (err) => next(err))
        .catch((err) => next(err));
});

exports.loggedinuser = ( async (req, res, next) => {
    await SuperAdmin.findOne({})
        .then((user) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(user);
        }, (err) => next(err))
        .catch((err) => next(err));
});

exports.signup = ( (req, res, next) => {
    SuperAdmin.register(new SuperAdmin({ username: req.body.username}),
        req.body.password, (err, user) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.json({ err: err });
            } else {
                user.save((err, user) => {
                    if (err) {
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'application/json');
                        res.json({ err: err });
                        return;
                    }
                    passport.authenticate('local')(req, res, () => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json({ success: true, status: 'Registration Successful!' });
                    });
                });
            }
        });
});

exports.login = ((req, res) => {
    if(!req.body.username){ 
        res.json({success: false, msg: "Username can not be empty"}) 
    } 
    else { 
    if(!req.body.password){ 
      res.json({success: false, msg: "Password field is empty"}) 
    }
    else { 
      passport.authenticate('local', function (err, user, info) {  
        if(err){ 
           res.json({success: false, msg: err}) 
        } 
        else{ 
          if (! user) { 
            res.json({success: false, msg: 'username or password incorrect'}) 
          } 
          else{ 
            req.login(user, function(err){ 
              if(err){ 
                res.json({success: false, msg: err}) 
              }
              else{ 
                var token = authenticate.getToken({ username: req.user.username});
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({ success: true, token: token, status: 'You are successfully logged in!',user:req.user });
              } 
            }); 
          } 
         } 
      })(req,res);
    } 
  } 
});

exports.logout = ( (req, res, next) => {
    if (req.session) {
        req.session.destroy();
        res.clearCookie('session-id');
        res.redirect('/');
    } else {
        var err = new Error('You are not logged in!');
        err.status = 403;
        next(err);
    }
});

