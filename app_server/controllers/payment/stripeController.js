var express = require('express');
var router = express.Router();
var Stripe = require('stripe');
const stripe = new Stripe('stripe key', {
  apiVersion: '2020-03-02',
});
// const uuid =  require("uuid"); 
var shortid = require('shortid');
exports.checkoutViaCard = (async (req, res) => {
  let error;
  let status;
  try {
    const { user, token } = req.query;

    const customer = await stripe.customers.create({ 
      email: token.email,
      source: token.id
    });

    const idempotencyKey = shortid.generate();
    const charge = await stripe.charges.create(
      {
        amount: user.total * 100,
        currency: "rs",
        customer: customer.id,
        receipt_email: token.email,
      },
      {
        idempotency_key
      }
    );

    console.log("Charge:", { charge });

    status = "success";
  } catch (error) {
    console.error("Error:", error);
    status = "failure";
  }

  res.json({ error, status });
}
)