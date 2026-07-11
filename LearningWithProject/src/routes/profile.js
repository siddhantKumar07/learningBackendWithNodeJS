const express = require("express");
const {userAuth} = require("../middleware/auth");
const profileRouter = express.Router();

profileRouter.get("/profile",userAuth,async(req,res)=>{
   const user = req.user;
   res.status(200).json({
    message:"user fetched successfully",
    user:user
   })
  })
