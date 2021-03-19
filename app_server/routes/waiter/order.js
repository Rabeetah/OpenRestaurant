var express = require('express');
var router = express.Router();
const orderController = require('../../controllers/waiter/orderController');

/////////////////////////////////////////////        GET OPERATIONS        //////////////////////////////////////////////

router.get('/vieworder/:id', orderController.viewOrder);

module.exports = router;
