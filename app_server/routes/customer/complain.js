var express = require('express');
var router = express.Router();
const complaintController = require("../../controllers/customer/complaintController");

router.post("/registercomplaint", complaintController.complainRegister);

router.get('/viewcomplain', complaintController.viewComplains);

module.exports = router;
