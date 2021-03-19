var express = require('express');
var router = express.Router();
const restaurantController = require('../../controllers/waiter/restaurantController');

/////////////////////////////////////////////        POST OPERATIONS        //////////////////////////////////////////////

router.post('/findwaiter/', restaurantController.findWaiter);

module.exports = router;