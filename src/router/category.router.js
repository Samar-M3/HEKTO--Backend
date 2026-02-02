const express = require("express");
const { getCategory, createCategory } = require("../controller/category.controller");
const router = express.Router();

router.get("/", getCategory);
router.post("/", createCategory);

module.exports = router;
