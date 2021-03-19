var express = require('express');
var router = express.Router();
    const stripeControllers = require("../../controllers/payment/stripeController");
  
//   /api/payment/stripe/pay
    router.get("/pay/checkoutViaCard",stripeControllers.checkoutViaCard);
  

  module.exports = router;
