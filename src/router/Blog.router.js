const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");
const checkfile = require("../middleware/checkfile");
const {
  getblog,
  createBlog,
  updateblog,
  deleteblog,
} = require("../controller/Blog.controller");
router.get("/", getblog);
router.post("/", upload.single("image"), checkfile, createBlog);
router.patch("/:id", upload.single("image"), checkfile, updateblog);
router.delete("/:id", deleteblog);

module.exports = router;
  