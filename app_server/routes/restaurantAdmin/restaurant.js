var express = require('express');
var router = express.Router();
const restaurantController = require('../../controllers/restaurantAdmin/restaurantController');

/////////////////////////////////////////////        POST OPERATIONS        //////////////////////////////////////////////

router.post('/findrestaurant/', restaurantController.findRestaurant);

router.post('/getrestaurant/', restaurantController.getRestaurantById);

router.post('/addwaitertorestaurant', restaurantController.addWaiterToRestaurant);

router.post('/addstafftorestaurant', restaurantController.addStaffToRestaurant);

/////////////////////////////////////////////        GET OPERATIONS        //////////////////////////////////////////////



/////////////////////////////////////////////        PUT OPERATIONS        //////////////////////////////////////////////

router.put('/:rid/menu/:mid', restaurantController.addMenuToRestaurant);

module.exports = router;
