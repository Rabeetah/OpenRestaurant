var express = require('express');
var router = express.Router();
var auth = require('../../../middleware/auth');
const customerController = require("../../controllers/userprofile/customerController");

router.post("/registercustomer", customerController.customerRegister);

router.post("/logincustomer", customerController.customerLogin);

router.get("/getcustomer", auth, customerController.getCustomer);

router.post("/activationcustomer",  customerController.customerActivation);


 

module.exports = router;