var express = require('express');
var router = express.Router();
const staffController = require('../../controllers/userprofile/staffController');
var auth = require('../../../middleware/auth')

/////////////////////////////////////////////        GET OPERATIONS        //////////////////////////////////////////////

router.get('/viewstaff/:staffId', staffController.viewStaff);

router.get("/image/:staffId", staffController.staffPhoto);

router.get("/getallstaff", staffController.getAllStaff);

/////////////////////////////////////////////        PUT OPERATIONS        //////////////////////////////////////////////

router.put('/addphoto/:staffId', staffController.addPhoto);

/////////////////////////////////////////////        PARAM OPERATIONS        //////////////////////////////////////////////

router.param("staffId", staffController.staffById);

/**
 * @route   POST routes/user/loginstaff
 * @desc    Login user
 * @access  Public
 */

router.post('/loginstaff', staffController.staffLogin);

/**
 * @route   POST routes/user/registerstaff
 * @desc    Register new user
 * @access  Public
 */

router.post('/registerstaff', staffController.staffRegister);

/**
 * @route   GET user/staff
 * @desc    Get user data
 * @access  Private
 */

router.get('/staff', auth, staffController.staffProfile);

module.exports = router;
