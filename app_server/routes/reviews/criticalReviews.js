var express = require('express');
var router = express.Router();
  const criticalReviewsController = require("../../controllers/reviews/criticalReviewsController");

  // /api/criticalreviews/
  router.post("/createlist",criticalReviewsController.createList);
  router.put("/add",criticalReviewsController.add);
  router.delete("/remove",criticalReviewsController.remove);
  router.post("/get",criticalReviewsController.get);
  router.get("/getlist",criticalReviewsController.getList);

module.exports = router;
