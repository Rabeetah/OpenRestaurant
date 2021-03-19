var express = require('express');
var router = express.Router();
const restaurantController = require('../../controllers/customer/restaurantController');

/////////////////////////////////////////////        GET OPERATIONS        //////////////////////////////////////////////

router.get('/viewrestaurant', restaurantController.viewRestaurant);

router.get('/findrestaurant', restaurantController.findRestaurant);

module.exports = router;
