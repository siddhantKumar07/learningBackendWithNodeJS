const express = require("express");
const jwt = require("jsonwebtoken");
const userModel = require("../model/user.model");
require("dotenv").config();
const postRouter = express.Router();

postRouter.post("/create",async (req, res) => {

    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message:"Unauthorized",
        })
    }
    const data = await jwt.verify(token,process.env.JWT_SECRET)
    // jwt token has three parts separated by dots (header, payload, signature). header is the algorithm which is used to sign the token 
    // payload is the data which is store in the token 
    // signature is created by combining the header,payload and secret key using the algorithm specified in the header.
    // for the verification it create a new signature with the header payload and the jwt secret and compare the new signature with the old one 

    if(!data){
        return res.status(401).json({
            message:"Unauthorized Access",
        })
    }
  const user = await userModel.findById(data.id)
  if(!user){
    return res.status(404).json({
        message:"User not found",
    })
  }

  return res.status(200).json({
      message:"Post created successfully",
      user
  })

})



module.exports = postRouter;