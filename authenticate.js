var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var SuperAdmin = require('./app_server/models/super_admin');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config.js');

passport.use(new LocalStrategy(SuperAdmin.authenticate()));
passport.serializeUser(SuperAdmin.serializeUser());
passport.deserializeUser(SuperAdmin.deserializeUser());

exports.getToken = function(user) {
    return jwt.sign(user, config.secretKey, { expiresIn: 3600 });
};

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    
    SuperAdmin.findOne({username: jwt_payload.username}, function(err, user) {
        if (err) {
            console.log('err1')
            return done(err, false);
        }
        if (user) {
            console.log('err2')
            return done(null, user);
        } else {
            console.log('err3')
            return done(null, false);
            // or you could create a new account
        }
    });
}));

exports.verifyUser = passport.authenticate('jwt', { session: false});

exports.verifyAdmin = (req, res, next) => {
    console.log(req.user);
    SuperAdmin.findOne({ username: req.user.username}, (err, user) => {
        console.log(user);
        if (err) {
            return next(err);
        } else if (user) {
            // res.locals.loggeduser = user;
            req.user=user;
        } else {
            res.send("You are not allowed to perform this operation");
        }
    });
};