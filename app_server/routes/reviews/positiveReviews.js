var express = require('express');
var router = express.Router();
const positiveReviewsController = require("../../controllers/reviews/positiveReviewsController");

  // /api/positivereviews/
  router.post("/createlist",positiveReviewsController.createList);
  router.put("/add",positiveReviewsController.add);
  router.delete("/remove",positiveReviewsController.remove);
  router.post("/get",positiveReviewsController.get);
  router.get("/getlist",positiveReviewsController.getList);

module.exports = router;
