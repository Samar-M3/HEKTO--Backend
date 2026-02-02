const mongoose=require("mongoose")
const BlogSchema=new mongoose.Schema({
    image:{
        type:String,
        required:true
    },
    title:{
        type:String,
    },
    description:{
        type:String,
    },
    brand:{
        type:String,
    },
    date:{
        type:String
    }
})

module.exports=mongoose.model("Blog",BlogSchema)