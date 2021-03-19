var express = require('express');
var router = express.Router();
const restaurantController = require('../../controllers/superAdmin/restaurantController');

/////////////////////////////////////////////       POST OPERATIONS        //////////////////////////////////////////////

router.post('/addrestaurant', restaurantController.addRestaurant);

/////////////////////////////////////////////        GET OPERATIONS        //////////////////////////////////////////////

router.get('/restaurants', restaurantController.viewRestaurant);

router.get('/restaurant/:id', restaurantController.viewRestaurantById);

///////////////////////////////////////////        DELETE OPERATIONS        //////////////////////////////////////////////

router.delete('/delrestaurant/:id', restaurantController.removeRestaurant);

/////////////////////////////////////////////        PUT OPERATIONS        //////////////////////////////////////////////

router.put('/editres/:rid', restaurantController.editRestaurant);

router.put('/restaurant/:rid/restaurantadmin/:raid', restaurantController.editRestaurantAndRestaurantAdmin);

module.exports = router;