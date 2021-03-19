var express = require('express');
var router = express.Router();
const staffController = require('../../controllers/restaurantAdmin/staffController');

/////////////////////////////////////////////       POST OPERATIONS        //////////////////////////////////////////////

router.post('/addstaff', staffController.addStaff);

/////////////////////////////////////////////        GET OPERATIONS        //////////////////////////////////////////////

router.get('/viewstaff', staffController.viewStaff);

///////////////////////////////////////////        DELETE OPERATIONS        //////////////////////////////////////////////

router.delete('/removestaff/:id', staffController.removeStaff);

module.exports = router;