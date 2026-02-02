const express=require("express")
const router=express.Router()
const userRouter=require("./user.router")
const productRouter=require("./product.router")
const bannerRouter=require("./baner.router")
const blogrouter=require("./Blog.router")
const categoryRouter=require("./category.router")
const cartRouter=require("./cartRouter")
const AdminRouter=require("./admin.router")
const profileRouter=require("./product.router")
const paymentrouter=require("./payment")
const orderrouter=require("./order.router")
const { path } = require("../app")
const routers=[
    {
        path:"/users",
        route:userRouter
    },
    {
        path:"/test",
        route:(req,res)=>{res.send('test route');
        }
    },
    {
        path:"/product",
        route:productRouter
    },
   
    {
        path:"/blog",
        route:blogrouter
    },
    {
        path:"/banner",
        route:bannerRouter,
    },
    {
        path:"/category",
        route:categoryRouter,
    },
    {
        path:"/cart",
        route:cartRouter
    },
    {
        path:"/admin",
        route:AdminRouter
    },
    {
        path:"/profile",
        route:profileRouter
    },
    {
        path:"/payment",
        route:paymentrouter
    },
    {
        path:"/orders",
        route:orderrouter
    }
]
routers.map((route)=>{
    router.use(route.path, route.route)

})

module.exports=router
