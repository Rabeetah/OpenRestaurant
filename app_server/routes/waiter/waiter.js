var express = require('express');
var router = express.Router();
const waiterController = require('../../controllers/waiter/waiterController');

/////////////////////////////////////////////       POST OPERATIONS        //////////////////////////////////////////////

router.post('/order/:wid/acceptorder/:oid', waiterController.acceptOrder);

router.post('/findwaiter/', waiterController.findWaiter);

/////////////////////////////////////////////        GET OPERATIONS        //////////////////////////////////////////////

router.get('/viewprofile/:id', waiterController.viewWaiterProfile);

/////////////////////////////////////////////        PUT OPERATIONS        //////////////////////////////////////////////

router.put('/editprofile/:wid/editname/:name', waiterController.editNameInSetting);

router.put('/editprofile/:/wid/editusername/:username', waiterController.editUsernameInSetting);

router.put('/editprofile/:wid/editemail/:email', waiterController.editEmailInSetting);

router.put('/editprofile/:wid/editphonenumber/:phonenumber', waiterController.editPhonenumberInSetting);

router.put('/editprofile/:wid/editpassword/:password', waiterController.editPasswordInSetting);

router.put('/editprofile/:wid/editstatus/:status', waiterController.editStatusInSetting);

router.put('/editprofile/:wid/editpicture/:picture', waiterController.editPictureInSetting);

module.exports = router;