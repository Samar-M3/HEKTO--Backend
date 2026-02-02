const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const productSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: [true, "image is required"],
    },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    category: {
      type: ObjectId,
      // type:String
      ref: "Category",
    },
    type: {
      type: ObjectId,
      ref: "ProductType",
    },
    code: {
      type: String,
    },
    cat_code: {
      type: String,
    },
    discount_price: {
      type: String,
    },
    description: {
      type: String,
    },
    sections: {
      newArrival: { type: Boolean, default: false },
      featured: { type: Boolean, default: false },
      bestSeller: { type: Boolean, default: false },
      specialOffer: { type: Boolean, default: false },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
