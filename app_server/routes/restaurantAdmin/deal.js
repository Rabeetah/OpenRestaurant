var express = require('express');
var router = express.Router();
const dealController = require('../../controllers/restaurantAdmin/dealController');

/////////////////////////////////////////////       POST OPERATIONS        //////////////////////////////////////////////

router.post('/adddeal', dealController.addDeal);

/////////////////////////////////////////////        GET OPERATIONS        //////////////////////////////////////////////

router.get('/viewdeal/:dealId', dealController.viewDeal);

router.get("/image/:dealId", dealController.dealPhoto);

router.get("/getalldeals", dealController.getAllDeals);

///////////////////////////////////////////        DELETE OPERATIONS        //////////////////////////////////////////////

router.delete('/removedeal/:id', dealController.removeDeal);

/////////////////////////////////////////////        PUT OPERATIONS        //////////////////////////////////////////////

router.put('/editdeal/:did', dealController.editDeal);

router.put('/addphoto/:dealId', dealController.addPhoto);

/////////////////////////////////////////////        PARAM OPERATIONS        //////////////////////////////////////////////

router.param("dealId", dealController.dealById);

module.exports = router;