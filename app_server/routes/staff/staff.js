var express = require('express');
var router = express.Router();
const staffController = require('../../controllers/staff/staffController');

/////////////////////////////////////////////        GET OPERATIONS        //////////////////////////////////////////////

router.get('/viewprofile/:id', staffController.viewStaffProfile);

module.exports = router;