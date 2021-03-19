var express = require('express');
var router = express.Router();
const settingController = require('../../controllers/restaurantAdmin/settingController');

/////////////////////////////////////////////        PUT OPERATIONS        //////////////////////////////////////////////

router.put('/editusername/:rid', settingController.editUsernameInSetting);

router.put('/editemail/:rid', settingController.editEmailInSetting);

router.put('/editphonenumber/:rid', settingController.editPhoneNumberInSetting);

router.put('/editpassword/:rid', settingController.editPasswordInSetting);

module.exports = router;