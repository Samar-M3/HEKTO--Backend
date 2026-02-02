const { required } = require("joi")
const mongoose=require("mongoose")
const categorySchema=new mongoose.Schema({

    title:{
        type:String,
        required:true
    },
    // code:{
    //     type:String,
    //     required:true
    // }

},{
    timestamps:true
})  

const Category=mongoose.model("Category",categorySchema)
module.exports=Category