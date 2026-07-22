const userModel = require("../model/user.model");
const jwt = require("jsonwebtoken")
require("dotenv").config();
const register =async (req, res) => {// controller function to handle user registration
  const { name, email, password } = req.body;
    try{
  const user  =  await userModel.create({
        name: name,
        email: email,
        password: password,
     })
     const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1h"})
     res.cookie("token",token,{
        httpOnly:true,
        maxAge:3600000,// 1 hour
     })
     res.status(201).json({
        message:"User registered successfully",
        data:{
            name:name,
            email:email,
            password:password,
        }
     })
    }catch(error){
        res.status(500).json({
            message:"Error registering user",
            error:error.message,
        })
    }
  
}
module.exports = { register };