var RestaurantAdmin = require('../../models/restaurant_admin');
var bcrypt = require('bcrypt');

/////////////////////////////////////////////        PUT OPERATIONS        //////////////////////////////////////////////

exports.editUsernameInSetting = (function(req, res, next) {
    RestaurantAdmin.findByIdAndUpdate({_id:req.params.rid},{username:req.body.username}).then(function() {
        RestaurantAdmin.findOne({_id:req.params.rid}).then(function(Setting){
            res.send(RestaurantAdmin);
        });
    });
});

exports.editEmailInSetting = (function(req, res, next) {
    RestaurantAdmin.findByIdAndUpdate({_id:req.params.rid},{email:req.body.email}).then(function() {
        RestaurantAdmin.findOne({_id:req.params.rid}).then(function(Setting){
            res.send(RestaurantAdmin);
        });
    });
});

exports.editPhoneNumberInSetting = (function(req, res, next) {
    RestaurantAdmin.findByIdAndUpdate({_id:req.params.rid},
        {
            phonenumber:req.body.phonenumber
        },{ new: true, upsert: false },
        function(error, results) {
            if (error) {
                return next(error);
            }
            // Respond with valid data
            res.json(results);
        });
});

exports.editPasswordInSetting = async(req, res, next) => {
    // RestaurantAdmin.findByIdAndUpdate({_id:req.params.rid},{password:req.body.password}).then(function() {
    //     RestaurantAdmin.findOne({_id:req.params.rid}).then(function(Setting){
    //         res.send(RestaurantAdmin);
    //     });
    // });
    const {password, newpassword, confirmnewpassword} = req.body;
    try {
        // Check for existing user
        const user = await RestaurantAdmin.findOne({ _id:req.params.rid });
        console.log(user)
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw Error('Wrong current password');
        console.log("dds"+isMatch)

        const isMatchn = await newpassword.localeCompare(confirmnewpassword);
        if (isMatchn != 0) throw Error('New Password does not match');
        console.log(isMatchn)

        // const isMatchn = await compare(newpassword,confirmnewpassword);
        // if (!isMatchn) throw Error('New Password does not match');
        // console.log(isMatchn)

        const salt = await bcrypt.genSalt(10);
        if (!salt) throw Error('Something went wrong with bcrypt');
    
        const hash = await bcrypt.hash(confirmnewpassword, salt);
        if (!hash) throw Error('Something went wrong hashing the password');

        await RestaurantAdmin.findOneAndUpdate({_id:req.params.rid},{password:hash}).then(function() {
        RestaurantAdmin.findOne({_id:req.params.rid}).select('_id, name, email').then(function(Setting){
            res.send(Setting);
        });
    })
      } catch (e) {
        console.log('Hey its me your most hatred error huhuhuhu')
        res.status(400).json({ msg: e.message });
      }
}


