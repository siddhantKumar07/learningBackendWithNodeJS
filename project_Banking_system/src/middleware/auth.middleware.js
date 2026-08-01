const jwt = require("jsonwebtoken");
const userModel = require("../model/user.model");
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