const validator = require("validator");
const registerMiddleware = (req,res,next)=>{
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
 return next();

}catch(err){
    return res.status(500).json({message:"Internal server error",error:err.message});
}
}
module.exports = {registerMiddleware}