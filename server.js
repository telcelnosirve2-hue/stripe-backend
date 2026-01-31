const express = require("express");
const Stripe = require("stripe");
const cors = require("cors");

const stripe = Stripe("PEGA_TU_SECRET_KEY_AQUI");

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
