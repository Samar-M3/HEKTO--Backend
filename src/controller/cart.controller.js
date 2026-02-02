const mongoose=require("mongoose")
const Cart=require("../model/cart.model")
const deleteImage=require("../utils/deleteimage")

const createCart = async (req, res, next) => {
  try {
    const userid=req.user._id
    const payload={...req.body,user:userid}
    const product = await Cart.create(payload);
    res.status(200).json({           
      success: "true",
      data: product,
    });
  } catch (err) {
    if (req.file) {
      deleteImage(req.body.image);
    }
    next(err);
  }
};

const getAllCartItem=async(req,res,next)=>{
    try{
        const cart=await Cart.find()
        res.status(200).json({
            status:"success",
            data:cart
        })
    }catch(err){
        if(req.file){
            deleteImage(req.body.image)
        }
        next(err)
    }
}

const getCart=async(req,res,next)=>{
    try{
        const user=req.user
        const cart=await Cart.find({user:user._id})

    }catch(err){
        next(err)
    }

}

module.exports={
    getCart,createCart,
    getAllCartItem
}