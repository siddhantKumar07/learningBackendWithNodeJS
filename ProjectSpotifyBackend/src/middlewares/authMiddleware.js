const validator = require("validator");
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const registerAuthMiddleware= (req,res,next)=>{
    const {username,email,password,role} = req.body;
    if(!username || !email || !password || !role) {
        return res.status(400).json({message:"All fields are required"});
    }
    if(!username.length>7&&!username.length<21){
      return  res.status(400).json({
            message:"username must be at least  8 characters long and less than 21 characters long"
        })
    }
    if(!validator.isEmail(email)){
        return res.status(400).json({
            message:"Invalid email"
        })
    }
    if(!validator.isStrongPassword(password)){
        return res.status(400).json({
            message:"Password is not strong enough"
        })
    }
    if(!["user","artist"].includes(role)){
        return res.status(400).json({
            message:"Role must be either user or artist"
        })
    }
    next();
}

// for login 
const loginAuthMiddleware =async (req,res,next)=>{
    const {email,password,username} = req.body;
   if((!email && !username) || !password){
    return res.status(400).json({
        message:"Email or username and password are required"
    })
   }

   // finding user by email or username
    const user = await  userModel.findOne({
        $or:[
            {email:email},
            {username:username}
        ]
    })
    if(!user){
        return res.status(400).json({
            message:"User not found"
        })
    }
// check if password is valid

   const isPasswordValid = await bcrypt.compare(password,user.password);
   if(!isPasswordValid){
    return res.status(400).json({
        message:"Invalid credentials"
    })
   }
   req.user = user;
   next();

}
module.exports = { registerAuthMiddleware, loginAuthMiddleware };