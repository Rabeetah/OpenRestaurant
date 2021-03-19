var express = require('express');
var router = express.Router();
  const reviewsController = require("../../controllers/reviews/reviewsController");

  // /api/reviews/
  router.get("/allreviews",reviewsController.getReviews);
  router.post("/allcustomerreviews",reviewsController.getReviewsCustomer);
  router.post("/allitemreviews",reviewsController.getReviewsItem);
  router.post("/getitemreview-customer",reviewsController.getItemReviewCustomer);
  router.post("/review",reviewsController.getReview);
  router.put("/changereviews",reviewsController.changeReview);
  router.post("/addreview",reviewsController.addReview);
  router.post("/review-liked-customer-item",reviewsController.getCustomerReviewsLikedForItem);
  router.delete("/removereviews",reviewsController.removeReview);
  router.put("/thumbsup",reviewsController.thumbsUp);
  router.put("/decthumbsup",reviewsController.decThumbsUp);
  router.put("/thumbsdown",reviewsController.thumbsDown);
  router.put("/decthumbsdown",reviewsController.decThumbsDown);

module.exports = router;

