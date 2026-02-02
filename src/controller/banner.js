  const mongoose = require("mongoose");
const Banner = require("../model/banner.model");
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

const createBanner = async (req, res,next) => {
  try {
    const banner = await Banner.create(req.body)
    res.status(201).json({
      status: "success",
      data: banner,
    });
  } catch (err) {
    console.log(err)
    if(req.file?.filename){
      await deleteimageCloudinary(req.file.filename)
    }
    // delete image if error occur
    // next(err);
  }
};

const getbanner = async (req, res,next) => {
  try {
    const banner = await Banner.find();
    res.status(200).json({
      status: "success",
      data: banner,
    });
  } catch (err) {
    if(req.file){
      deleteImage(req.body.image)
    }
    next(err);
  }
};

const delteBanner = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid banner ID" });
    }

    const banner = await Banner.findById(id);
    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    // ONLY delete if publicId exists
    if (banner.publicId) {
      await deleteimageCloudinary(banner.publicId);
    }

    await Banner.findByIdAndDelete(id);

    res.status(200).json({ message: "Banner deleted successfully" });
  } catch (err) {
    console.error("DELETE BANNER ERROR:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



const updatebanner = async (req, res) => {
  try {
    const { id } = req.params;

    // Convert to ObjectId safely
    const bannerId = new mongoose.Types.ObjectId(id);
    console.log("Updating banner ID:", bannerId);

    // Build update object from req.body (checkFiles already adds image/publicId if uploaded)
    const updateData = { ...req.body };

    // Prevent accidental overwrite of system fields
    delete updateData._id;
    delete updateData.createdAt;
    delete updateData.updatedAt;

    // If new image is uploaded, delete old Cloudinary image
    if (updateData.image) {
      const oldBanner = await Banner.findById(bannerId);
      if (oldBanner?.publicId) {
        await deleteimageCloudinary(oldBanner.publicId);
      }
    }

    // Update the banner
    const banner = await Banner.findByIdAndUpdate(bannerId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    res.status(200).json({
      message: "success",
      data: banner,
    });
  } catch (err) {
    console.error("UPDATE BANNER ERROR:", err);
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};



module.exports = { createBanner, getbanner, delteBanner,updatebanner,deleteimageCloudinary };
