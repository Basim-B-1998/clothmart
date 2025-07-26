const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/create-payment-intent', async (req, res) => {
  const { amount, currency } = req.body;

  if (!amount || !currency) {
    return res.status(400).json({ error: 'Amount and currency are required' });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: ['card'],
    });
    res.json({ clientSecret: paymentIntent.client_secret }); // ✅ use json
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message }); // ✅ use json
  }
});

module.exports = router;
