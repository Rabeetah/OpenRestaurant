var Waiter = require('../../models/waiter');

/////////////////////////////////////////////        PUT OPERATIONS        //////////////////////////////////////////////

exports.editUsernameInSetting = (function(req, res, next) {
    Waiter.findByIdAndUpdate({_id:req.params.rid},{username:req.body.username}).then(function() {
        Waiter.findOne({_id:req.params.rid}).then(function(Setting){
            res.send(Waiter);
        });
    });
});

exports.editEmailInSetting = (function(req, res, next) {
    Waiter.findByIdAndUpdate({_id:req.params.rid},{email:req.body.email}).then(function() {
        Waiter.findOne({_id:req.params.rid}).then(function(Setting){
            res.send(Waiter);
        });
    });
});

exports.editPhoneNumberInSetting = (function(req, res, next) {
    Waiter.findByIdAndUpdate({_id:req.params.rid},{phonenumber:req.body.phonenumber}).then(function() {
        Waiter.findOne({_id:req.params.rid}).then(function(Setting){
            res.send(Waiter);
        });
    });
});

exports.editPasswordInSetting = async(req, res, next) => {

    const {password, newpassword, confirmnewpassword} = req.body;
    try {
        // Check for existing user
        const user = await Staff.findOne({ _id:req.params.rid });
        console.log("adsad"+user)
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw Error('Wrong current password');
        console.log("dds"+isMatch)

        const isMatchn = await newpassword.localeCompare(confirmnewpassword);
        if (isMatchn != 0) throw Error('New Password does not match');
        console.log("adsd"+isMatchn)

        const salt = await bcrypt.genSalt(10);
        if (!salt) throw Error('Something went wrong with bcrypt');
    
        const hash = await bcrypt.hash(confirmnewpassword, salt);
        if (!hash) throw Error('Something went wrong hashing the password');

        await Staff.findOneAndUpdate({_id:req.params.rid},{password:hash}).then(function() {
            Staff.findOne({_id:req.params.rid}).select('_id, name, email').then(function(Setting){
            res.send(Setting);
        });
    })
      } catch (e) {
        console.log('Hey its me your most hatred error huhuhuhu')
        res.status(400).json({ msg: e.message });
      }
}

