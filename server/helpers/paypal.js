const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id: process.env.PALYPAL_CLIENT_ID,
  client_secret: process.env.PALYPAL_CLIENT_SECRET
});

module.exports = paypal;
