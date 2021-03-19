var express = require('express');
var router = express.Router();
const waiterController = require('../../controllers/restaurantAdmin/waiterController');

/////////////////////////////////////////////       POST OPERATIONS        //////////////////////////////////////////////

router.post('/addwaiter', waiterController.addWaiter);

/////////////////////////////////////////////        GET OPERATIONS        //////////////////////////////////////////////

router.get('/viewwaiter', waiterController.viewWaiter);

///////////////////////////////////////////        DELETE OPERATIONS        //////////////////////////////////////////////

router.delete('/removewaiter/:id', waiterController.removeWaiter);

module.exports = router;