var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var criticalReviewSchema = new Schema({
  reviews: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Review",
    },
  ],
});

module.exports = mongoose.model("CriticalReview", criticalReviewSchema);
