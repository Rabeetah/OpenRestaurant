var express = require('express');
var router = express.Router();
const restaurantController = require('../../controllers/superAdmin/restaurantAdminController');

/////////////////////////////////////////////       POST OPERATIONS        //////////////////////////////////////////////

router.post('/addadminrestaurant', restaurantController.addRestaurantAdmin);

/////////////////////////////////////////////        GET OPERATIONS        //////////////////////////////////////////////

router.get('/adminrestaurants', restaurantController.viewRestaurantAdmin);

router.get('/adminrestaurant/:id', restaurantController.viewRestauranAdminById);

///////////////////////////////////////////        DELETE OPERATIONS        //////////////////////////////////////////////

router.delete('/deladminrestaurant/:id', restaurantController.removeRestaurantAdmin);

/////////////////////////////////////////////        PUT OPERATIONS        //////////////////////////////////////////////

router.put('/changeresadmin/:raid', restaurantController.editRestaurantAdmin);

module.exports = router;