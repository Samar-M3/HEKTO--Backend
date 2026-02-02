const cloudinary=require("cloudinary")

const deleteimageCloudinary=async(publicId)=>{
  if(!publicId) return 
  try{
    await cloudinary.uploader.destroy(publicId)
    console.log("image deleted:",publicId)
  }catch(err){
    console.log("delete failed")
  }
}

module.exports={
    deleteimageCloudinary
}