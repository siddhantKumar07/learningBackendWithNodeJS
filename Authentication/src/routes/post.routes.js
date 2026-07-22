const express = require("express");
const jwt = require("jsonwebtoken");
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
      console.log(data);
    if(!data){
        return res.status(401).json({
            message:"Unauthorized",
        })
    }

    res.send("Post created successfully");

})



module.exports = postRouter;