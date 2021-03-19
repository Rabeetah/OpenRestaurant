var express = require('express');
var router = express.Router();
const menuController = require('../../controllers/restaurantAdmin/menuController');

/////////////////////////////////////////////       POST OPERATIONS        //////////////////////////////////////////////

router.post('/addmenu', menuController.addMenu);

router.post('/addsubmenutomenu', menuController.addSubmenuToMenu);

router.post('/adddealstomenu', menuController.addDealsToMenu);

router.post('/viewmenu', menuController.viewMenu);

/////////////////////////////////////////////        GET OPERATIONS        //////////////////////////////////////////////



module.exports = router;