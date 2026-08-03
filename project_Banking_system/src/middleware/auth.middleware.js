const jwt = require("jsonwebtoken");
const userModel = require("../model/user.model");
const validator = require("validator")
const authMiddleware =async (req,res,next)=>{
    const {token } = req.cookies;
    if(!token){
        return res.status(401).json({
            success:false,
            message:"Please login to access this resource"
        })
    }
    const decoded =await jwt.verify(token,process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);
    if(!user){
        return res.status(401).json({
            success:false,
            message:"User not found"
        })  
    }
    req.user = user;
    next();
}


const registerMiddleware = async(req,res,next)=>{
    const {name,email,password} = req.body;
    console.log(name,email,password)
    if(!name || !email || !password){
        return res.status(400).json({
            success:false,
            message:"Please provide name,email and password"
        })
    }
    if(name.length < 4 || name.length > 30){
        return res.status(400).json({
            success:false,
            message:"Name should be between 4 and 30 characters"
        })
    }
   if(!validator.isEmail(email)){
    return res.status(400).json({
        success:false,
        message:"please enter a valid email"
    })
   }
   if(!validator.isStrongPassword(password)){
    return res.status(400).json({
        success:false,
        message:"password should be atleast 8 character long, one uppercase, one symbol and number"
    })
   }

   next()

}

const loginMiddleware = async(req,res,next)=>{
    const {email,password}= req.body;
      
    if(!email||!password){
       return res.status(400).json({
            success:false,
            message:"email and password both required"
        })
    }
    const user =await userModel.findOne({email:email}).select("+password");
    if(!user){
      return  res.status(404).json({
            message:"user with this email is not exists"
        })
    }
        const isPassCorrect =await user.comparePass(password)
    if(!isPassCorrect){
      return  res.status(400).json({
            message:"please enter correct password"
        })
    }
req.user = user;
next()

}

module.exports ={
    authMiddleware,
    registerMiddleware,
    loginMiddleware
}
