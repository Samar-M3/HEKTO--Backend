const express=require("express");
const Order = require("../model/order");
const router=express.Router()

router.post("/",async (req, res) => {
  const order = new Order(req.body);
  await order.save();
  res.json({ message: "Order created!", order });
});

router.get("/", async (req, res) => {
  const orders = await Order.find();
  res.json(orders);  
});


module.exports=router