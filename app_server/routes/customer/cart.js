var express = require('express');
var router = express.Router();
const cartController = require('../../controllers/customer/cartController');

/////////////////////////////////////////////       POST OPERATIONS        //////////////////////////////////////////////

// router.post('/addcart', cartController.addCart);

router.post('/addCart', cartController.addCart);

router.post('/getCartItems', cartController.getCartItems);

router.post('/removeFromCart', cartController.removeFromCart);

router.post('/emptycart', cartController.emptyCart)


// router.post('/additemtocart', cartController.addItemsToCart);

// router.post('/adddealstocart', cartController.addDealsToCart);

// router.post('/getcartbyid/', cartController.getCartById);

module.exports = router;