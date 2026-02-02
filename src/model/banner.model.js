const { required } = require("joi")
const mongoose=require("mongoose")
const bannerSchema=new mongoose.Schema({
     image:{
        type:String,
        required: [true,"Image is required"]
    },
    publicId:{
        type:String
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    discountText:{
        type:String,
        
    },
    caption:{
        type:String
    },

})


// pre and post 

module.exports=mongoose.model('Banner',bannerSchema)
   