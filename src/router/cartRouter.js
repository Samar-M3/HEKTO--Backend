const express = require("express");
const { getCategory, createCategory } = require("../controller/category.controller");
const { getCart, getAllCartItem, createCart } = require("../controller/cart.controller");
const { isauthenticated, Isbuyer, Isadmin } = require("../middleware/auth");
const router = express.Router();

router.get("/",isauthenticated,Isadmin,getAllCartItem );
router.post("/cart",isauthenticated,Isbuyer, createCart);
router.get("/:id",isauthenticated,Isbuyer, getCart);

module.exports = router;
