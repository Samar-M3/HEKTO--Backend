const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: String,
  products: [{ productId: String, quantity: Number, price: Number }],
  totalPrice: Number,
  status: String,
  createdAt: { type: Date, default: Date.now },
});
const Order = mongoose.model("Order", OrderSchema);
module.exports=Order