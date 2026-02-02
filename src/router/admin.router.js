const express=require("express")
const router=express.Router()
const {isauthenticated,Isadmin}=require("../middleware/auth")


router.get("/dashboard",isauthenticated,Isadmin,(req,res)=>{
    res.json({secretdata:"admin only"})
})

module.exports=router