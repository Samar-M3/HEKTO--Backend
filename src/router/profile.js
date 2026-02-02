const { isauthenticated } = require("../middleware/auth")
const User=require("../model/user.model")
const express=require("express")
const router=express.Router()

router.get("/me",isauthenticated,async(req,res)=>{
    const id=req.id
    const user=await User.findById(id).select("-password")
    res.json(user)
})

module.exports=router