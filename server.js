const express = require("express");
const Stripe = require("stripe");
const cors = require("cors");

const stripe = Stripe("pk_live_51SvBJ0KxYHfb5tBlF3Ks7xn5ysrHFmAwaK2A89z6nnJwLIrV0yox5bVJipo50ty3ECB4Wmt41rQYR8NBOjv4sIm400meRQA6hD");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/create-payment-intent", async (req, res) => {
  try {
    const amount = Number(req.body.amount);

    if (!amount || amount < 10) {
      return res.status(400).json({ error: "Monto mínimo $10 MXN" });
    }

    const payment = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "mxn",
      automatic_payment_methods: { enabled: true }
    });

    res.json({ clientSecret: payment.client_secret });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000);
