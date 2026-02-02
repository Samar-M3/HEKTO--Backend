const { string } = require("joi")
const mongoose=require("mongoose")
const ObjectId=mongoose.Types.ObjectId
const CartSchema=new mongoose.Schema({
    product:{
        type:ObjectId,
        ref:"Product"
    },
    user:{
        type:ObjectId,
        ref:"User"
    }
})

module.exports=mongoose.model("Cart",CartSchema)