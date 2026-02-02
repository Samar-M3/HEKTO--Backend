const express=require("express")

const createPayment = require("../controller/payment.controller")
const router = express.Router();


router.post("/",createPayment)

module.exports=router