const Stripe=require("stripe")
const stripe=new Stripe(process.env.STRIPE_SK)

const createPayment=async(req,res)=>{
     try {
        const { cartItems } = req.body;

  // Calculate total
  const totalAmount = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "npr",
            product_data: {
              name: "Test Product",
            },
            unit_amount: totalAmount * 100
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
    });

    // IMPORTANT: send session.url instead of session.id
    res.json({ url: session.url });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports=createPayment
