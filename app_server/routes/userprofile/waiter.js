var express = require('express');
var router = express.Router();
const waiterController = require('../../controllers/userprofile/waiterController');
var auth = require('../../../middleware/auth')

/////////////////////////////////////////////        GET OPERATIONS        //////////////////////////////////////////////

router.get('/viewwaiter/:waiterId', waiterController.viewWaiter);

router.get("/image/:waiterId", waiterController.waiterPhoto);

router.get("/getallwaiter", waiterController.getAllWaiter);

/////////////////////////////////////////////        PUT OPERATIONS        //////////////////////////////////////////////

router.put('/addphoto/:waiterId', waiterController.addPhoto);

/////////////////////////////////////////////        PARAM OPERATIONS        //////////////////////////////////////////////

router.param("waiterId", waiterController.WaiterById);

/**
 * @route   POST routes/user/loginwaiter
 * @desc    Login user
 * @access  Public
 */

router.post('/loginwaiter', waiterController.waiterLogin);

/**
 * @route   POST routes/user/registerwaiter
 * @desc    Register new user
 * @access  Public
 */

router.post('/registerwaiter', waiterController.waiterRegister);

/**
 * @route   GET user/waiter
 * @desc    Get user data
 * @access  Private
 */

router.get('/waiter', auth, waiterController.waiterProfile);

module.exports = router;
