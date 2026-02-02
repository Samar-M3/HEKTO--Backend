const mongoose = require("mongoose");
const Product = require("../model/product_model");
const deleteImage = require("../utils/deleteimage");
const cloudinary = require("cloudinary");
const Category = require("../model/category.model");

const createProcduct = async (req, res, next) => {
  try {
    if (!req.file)
      return res.status(400).json({ message: "Image is required" });
    const result = await cloudinary.uploader.upload(req.file.path);
    let categoryId;
    if (req.body.category) {
      let category = await Category.findOne({ title: req.body.category });

      if (!category) {
        return res.status(400).json({ message: "Invalid category ID" });
      }

      categoryId = category._id;
      delete req.body.category;
    }
    if (req.body.sections) {
      try {
        req.body.sections = JSON.parse(req.body.sections);
      } catch (err) {
        return res.status(400).json({ message: "Invalid sections format" });
      }
    }

    const product = await Product.create({
      ...req.body,
      image: result.secure_url,
     category: req.body.category,
      createdBy: req.user._id,
    });

    res.status(201).json({ message: "Product created", product });
  } catch (err) {
    next(err);
  }
};

const getProduct = async (req, res, next) => {
  try {
    const product = await Product.find().populate("category", "title code");
    res.status(200).json({
      status: "success",
      data: product,
    });
  } catch (err) {
    if (req.file) {
      deleteImage(req.body.image);
    }
    next(err);
  }
};

const getTrendingProduct = async (req, res, next) => {
  try {
    const product = await Product.find({ type: "trending" }).populate("category", "title code");
    res.status(200).json({
      status: "success",
      data: product,
    });
  } catch (err) {
    if (req.file) {
      deleteImage(req.body.image);
    }
    next(err);
  }
};

const getLatestProduct = async (req, res, next) => {
  try {
    const product = await Product.find().populate("category", "title code");
    res.status(200).json({
      status: "success",
      data: product,
    });
  } catch (err) {
    if (req.file) {
      deleteImage(req.body.image);
    }
    next(err);
  }
};
const getSingleProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const productId = new mongoose.Types.ObjectId(id);
    const data = await Product.findById(productId).populate(
      "category",
      "title code"
    );
    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const productId = new mongoose.Types.ObjectId(id);
    await Product.findByIdAndDelete(productId);
    res.status(200).send({ message: "delete success" });
  } catch (err) {
    console.log("this is error");
    next(err);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const productId = new mongoose.Types.ObjectId(id);
    console.log(productId);
    if (req.body.sections) {
      try {
        req.body.sections = JSON.parse(req.body.sections);
      } catch {
        return res.status(400).json({ message: "Invalid sections format" });
      }
    }

    const product = await Product.findByIdAndUpdate(productId, req.body, {
      new: true,
      runValidators: true,
    }).populate("category", "title code");

    res.status(200).send({ message: "success", product });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createProcduct,
  getProduct,
  getTrendingProduct,
  getLatestProduct,
  getSingleProduct,
  deleteProduct,
  updateProduct,
};
