const express = require("express")
const app = express()
const cors = require("cors")
app.use(express.json())
app.use(
  cors({
    origin: "http://localhost:3000",
  })
)

const STRIPE_PRIVATE_KEY='sk_test_51KZXQ8Foq0qfjkNLwv2SiG7gYVwkpz878gB5KLJndEDiwCs3ECEh8Uv6rioYChiT1SuNrWDGKCTzjXJ40mUyn7wc00oYnGs75r'
const CLIENT_URL = 'http://localhost:3000/'

const stripe = require("stripe")(STRIPE_PRIVATE_KEY)

const storeItems = new Map([
  [1, { priceInCents: 10000, name: "Learn React Today" }],
  [2, { priceInCents: 20000, name: "Learn CSS Today" }],
])

app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map(item => {
        const storeItem = storeItems.get(item.id)
        console.log('storeItem', storeItem)
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.priceInCents,
          },
          quantity: item.quantity,
        }
      }),
      success_url: `${CLIENT_URL}`,
      cancel_url: `${CLIENT_URL}`,
    })
    console.log(session)

    res.json({ url: session.url })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})
app.listen(5000)
