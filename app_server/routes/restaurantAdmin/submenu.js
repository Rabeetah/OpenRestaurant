var express = require('express');
var router = express.Router();
const submenuController = require('../../controllers/restaurantAdmin/submenuController');

/////////////////////////////////////////////       POST OPERATIONS        //////////////////////////////////////////////

router.post('/addsubmenu', submenuController.addSubmenu);

router.post('/additemtosubmenu', submenuController.addItemsToSubmenu);

router.post('/adddealstosubmenu', submenuController.addDealsToSubmenu);

router.post('/getsubmenu/', submenuController.getSubmenuById);

///////////////////////////////////////////        DELETE OPERATIONS        //////////////////////////////////////////////

router.delete('/removeitemfromsubmenu', submenuController.removeItemFromSubmenu);

router.delete('/removesubmenu/:id', submenuController.removeSubmenu);

///////////////////////////////////////////        PUT OPERATIONS        //////////////////////////////////////////////

router.put('/editsubmenu/:sid', submenuController.editSubmenu);

module.exports = router;