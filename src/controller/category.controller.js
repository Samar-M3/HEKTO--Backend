const mongoose = require("mongoose");
const deleteImage = require("../utils/deleteimage");
const Category = require("../model/category.model");

const createCategory = async (req, res, next) => {
  try {
    const category = await Category.create(req.body);
    res.status(200).json({
      success: "true",
      data: category,
    });
  } catch (err) {
  
    next(err);
  }
};

const getCategory = async (req, res, next) => {
  try {
    const category = await Category.find();
    res.status(200).json({
      success: "true",
      data: category,
    });
  } catch (err) {
  
    next(err);
  }
};

module.exports={
createCategory,
getCategory
}