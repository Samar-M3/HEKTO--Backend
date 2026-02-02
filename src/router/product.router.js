const express = require("express");
const {
  getNewProduct,
  getProduct,
  createProcduct,
  getLatestProduct,
  deleteProduct,
  updateProduct,
  getTrendingProduct,
  getSingleProduct,
} = require("../controller/product_controller");
const router = express.Router();
// const { route } = require("../app");
const upload = require("../utils/multer");
const checkfile = require("../middleware/checkfile");
const { isauthenticated, Isadmin, IsSeller } = require("../middleware/auth");
router.get("/", getProduct);
router.get("/trending", getTrendingProduct);
router.get("/latest", getLatestProduct);
router.post("/",isauthenticated,Isadmin || IsSeller, upload.single("image"), checkfile, createProcduct);
router.delete("/:id", deleteProduct);
router.get("/:id", getSingleProduct);
router.patch("/:id", upload.single("image"), checkfile, updateProduct);

module.exports = router;  
