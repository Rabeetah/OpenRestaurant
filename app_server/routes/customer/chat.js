var express = require('express');
var router = express.Router();
const chatController = require('../../controllers/customer/chatController');

router.post("/conversation/query" ,chatController.conversationquery);
router.post("/sendmessage",chatController.sendmessage);
router.get("/allmessages",chatController.allmessages);
router.post("/getcustomers",chatController.getCustomers);
module.exports = router;