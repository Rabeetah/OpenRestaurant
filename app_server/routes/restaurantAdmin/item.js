var express = require('express');
var router = express.Router();
const itemController = require('../../controllers/restaurantAdmin/itemController');

/////////////////////////////////////////////       POST OPERATIONS        //////////////////////////////////////////////

router.post('/additem', itemController.addItem);

/////////////////////////////////////////////        GET OPERATIONS        //////////////////////////////////////////////

router.get('/viewitem/:itemId', itemController.viewItem);

router.get("/image/:itemId", itemController.itemPhoto);

router.get("/getallitems", itemController.getAllItems);

///////////////////////////////////////////        DELETE OPERATIONS        //////////////////////////////////////////////

router.delete('/removeitem/:id', itemController.removeItem);

/////////////////////////////////////////////        PUT OPERATIONS        //////////////////////////////////////////////

router.put('/edititem/:eid', itemController.editItem);

router.put('/addphoto/:itemId', itemController.addPhoto);

/////////////////////////////////////////////        PARAM OPERATIONS        //////////////////////////////////////////////

router.param("itemId", itemController.itemById);

module.exports = router;
