const express=require("express")
const {createBanner,delteBanner,getbanner, updatebanner} = require("../controller/banner")
const router=express.Router()
const upload=require("../utils/multer")
const checkfile = require("../middleware/checkfile")
router.get("/",getbanner)
router.post("/",upload.single("image"),checkfile,createBanner)

router.delete("/:id",
    delteBanner
)

router.patch("/:id",upload.single("image"),checkfile, updatebanner)

module.exports=router