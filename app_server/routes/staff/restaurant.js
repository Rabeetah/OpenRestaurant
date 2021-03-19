var express = require('express');
var router = express.Router();
const restaurantController = require('../../controllers/staff/restaurantController');

/////////////////////////////////////////////        POST OPERATIONS        //////////////////////////////////////////////

router.post('/findstaff', restaurantController.findStaff);

module.exports = router;