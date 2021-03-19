var express = require('express');
var router = express.Router();
const ratingsController = require("../../controllers/ratings/ratingsController");

  // /api/ratings/
  router.get("/allratings",ratingsController.getRatings);
  router.get("/allratingswithitems",ratingsController.getRatingsAll);
  router.post("/suggestions",ratingsController.Suggest);
  router.post("/allcustomerratings",ratingsController.getRatingsCustomer);
  router.post("/allitemratings",ratingsController.getRatingsItem);
  router.post("/get-item-ratings-reviews-customer-order",ratingsController.getRatingsPlusReviewsCustomerOrder);
  router.post("/getitemratings-customer",ratingsController.getItemRatingsCustomer);
  router.post("/getratings-reviews-item",ratingsController.getRatingsPlusReviewsItem);
  router.post("/item-ratings-count",ratingsController.getRatingsCount);
  router.post("/rating",ratingsController.getRating);
  router.put("/changeratings",ratingsController.changeRating);
  router.post("/rate",ratingsController.rate);
  router.delete("/removeratings",ratingsController.removeRating);

module.exports = router;

