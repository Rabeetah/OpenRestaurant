var express = require('express');
var router = express.Router();
const restaurantAdminController = require('../../controllers/userprofile/restaurantAdminController');
var auth = require('../../../middleware/auth')

/////////////////////////////////////////////        GET OPERATIONS        //////////////////////////////////////////////

router.get('/viewrestaurantadmin/:restAdminId', restaurantAdminController.viewRestaurantAdmin);

router.get("/image/:restAdminId", restaurantAdminController.restaurantAdminPhoto);

router.get("/getallrestaurantadmin", restaurantAdminController.getAllRestaurantAdmin);

/////////////////////////////////////////////        PUT OPERATIONS        //////////////////////////////////////////////

router.put('/addphoto/:restAdminId', restaurantAdminController.addPhoto);

/////////////////////////////////////////////        PARAM OPERATIONS        //////////////////////////////////////////////

router.param("restAdminId", restaurantAdminController.restaurantAdminById);

/**
 * @route   POST routes/userprofile/restaurantadmin/loginrestaurantadmin
 * @desc    Login user
 * @access  Public
 */

router.post('/loginrestaurantadmin', restaurantAdminController.restaurantAdminLogin);

/**
 * @route   POST routes/userprofile/restaurantadmin/registerrestaurantadmin
 * @desc    Register new user
 * @access  Public
 */

router.post('/registerrestaurantadmin', restaurantAdminController.restaurantAdminRegister);

/**
 * @route   GET userprofile/restaurantadmin/restaurantadmin
 * @desc    Get user data
 * @access  Private
 */

router.get('/restaurantadmin', auth, restaurantAdminController.restaurantAdminProfile);

module.exports = router;
