var express = require('express');
var router = express.Router();
const orderController = require('../../controllers/customer/orderController');

/////////////////////////////////////////////       POST OPERATIONS        //////////////////////////////////////////////

router.post('/addOrder', orderController.addOrder);

router.post('/viewOrder/', orderController.viewOrder);

router.get("/getallorders", orderController.getAllOrders);

router.post('/viewcustomerorder', orderController.viewCustomerOrder);

router.post('/viewallcustomerorders', orderController.viewAllCustomerOrders);

router.post('/getallrestorders', orderController.viewAllRestOrders);

router.post('/viewordercustomer', orderController.viewOrderCustomer);

router.post('/getallrestorderscurrent', orderController.viewAllRestOrdersCurrent);

router.post('/getallrestordersprepared', orderController.viewAllRestOrdersPrepared);

router.post('/getallrestorderscomplete', orderController.viewAllRestOrdersComplete);

router.post('/setstatus', orderController.setStatus);

router.post('/waiterreadyorders', orderController.waiterReadyOrders);

router.post('/waitercompleteorders', orderController.waiterCompleteOrders);

router.post('/setdeliveredstatus', orderController.setDeliveredStatus);

router.get('/getordersCSV/:restid', orderController.getOrdersForCSV);

router.post('/extractstringsfromorders', orderController.extractWordsOrder);

router.post('/getordersJSON', orderController.getOrdersJSON);

router.post('/getordersbydate', orderController.getOrdersByDates);

router.post('/viewallcustomerorders/complete', orderController.viewAllCustomerOrdersComplete);

router.post('/viewallcustomerorders/pending', orderController.viewAllCustomerOrdersPending);

router.post('/search', orderController.search)

router.post('/searchp', orderController.partialsearch)

router.post('/searchh', orderController.searchFileContentHandler)


module.exports = router;