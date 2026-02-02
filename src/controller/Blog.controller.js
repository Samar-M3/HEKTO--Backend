const mongoose = require("mongoose");
const Blog = require("../model/Blog.model");
const deleteImage = require("../utils/deleteimage");
const product_model = require("../model/product_model");
const cloudinary = require("../utils/cloudinary");

const createBlog = async (req, res, next) => {
  let imageData;

  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    imageData = await cloudinary.uploader.upload(req.file.path, {
      folder: "blogs",
    });

    const blog = await Blog.create({
      title: req.body.title,
      content: req.body.content,
      image: {
        url: imageData.secure_url,
        public_id: imageData.public_id,
      },
      author: req.user.id,
    });

    return res.status(201).json({
      success: true,
      message: "Blog created successfully",
      blog,
    });
  } catch (err) {
    if (imageData?.public_id) {
      deleteImage(imageData.public_id);
    }
    next(err);
  }
};

const getblog = async (req, res, next) => {
  try {
    const blog = await Blog.find();
    res.status(200).json({
      status: "success",
      data: blog,
    });
  } catch (err) {
    if (req.body) {
      deleteImage(req.body.image);
    }
    next();
  }
};

const updateblog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({
      message: "Blog updated successfully",
      data: blog,
    });
  } catch (err) {
    if (req.body.image) {
      deleteImage(req.body.image);
    }
    next(err);
  }
};

const deleteblog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const blogid = new mongoose.Types.ObjectId(id);
    await Blog.findOneAndDelete(blogid);
    res.status(200).send({ message: "delete success" });
  } catch {
    next(err);
  }
};

module.exports = { getblog, updateblog, deleteblog, createBlog };
