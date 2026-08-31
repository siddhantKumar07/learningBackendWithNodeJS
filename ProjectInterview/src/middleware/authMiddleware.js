const validator = require("validator");
const userModel = require("../model/user.model");
const blackListToken = require("../model/blackList.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const registerMiddleware =async (req,res,next)=>{
try{
const {username,email,password} = req.body;
if(!username || !email || !password){
    return res.status(400).json({message:"Please provide all required fields"});
}
if(password.length<8||!validator.isStrongPassword(password)){
   return res.status(400).json({message:"Password must be at least 8 characters long"});
}
if(!validator.isEmail(email)){
   return res.status(400).json({message:"Please provide a valid email"});
}
if(username.length<3||username.length>20){
    return res.status(400).json({message:"Username must be between 3 and 20 characters long"});
}
const existingUser =await userModel.findOne({$or:[{userName:username},{email:email}]});
if(existingUser){
    return res.status(400).json({message:"Username or email already exists"});
} 

 return next();

}catch(err){
    return res.status(500).json({message:"Internal server error",error:err.message});
}
}

const loginMiddleware = async (req,res,next)=>{
    try{
        const {email,password,username} = req.body;
    if(!email && !username){
        return res.status(400).json({message:"Please provide either email or username"});
    }
    if(!password){
        return res.status(400).json({message:"Please provide password"});
    }
    const user = await userModel.findOne(
        {
            $or:[{userName:username},{email:email}]
        }).select("+password");

        if(!user){
            return res.status(400).json({message:"Invalid credentials"});
        }
         req.user = user;
          next();
    }catch(err){
        return res.status(500).json({message:"Internal server error",error:err.message});
    }

}

// auth middleware to check if the user is logged in or not

const authMiddleware = async (req,res,next)=>{
try{
   const {token} = req.cookies;
if(!token){
   return res.status(401).json({message:"User is not logged in"});
}
const isBlackListed = await blackListToken.findOne({token:token});
if(isBlackListed){
    return res.status(401).json({message:"token is blacklisted, please login again"});
}
const decoded = jwt.verify(token,process.env.JWT_SECRET);
req.user = decoded;
next() 
}catch(error){
    return res.status(401).json({message:"User is not logged in",error:error.message});
}


}
module.exports = {registerMiddleware,loginMiddleware,authMiddleware};