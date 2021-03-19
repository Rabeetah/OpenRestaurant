var express = require('express');
var router = express.Router();
const checkoutController = require('../../controllers/customer/checkoutController');

/////////////////////////////////////////////       POST OPERATIONS        //////////////////////////////////////////////

router.post('/proceedcheckout', checkoutController.proceedCheckout);

module.exports = router;