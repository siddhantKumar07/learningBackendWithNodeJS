const userModel = require("../model/user.model")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const {sendRegistrationEmail}= require("../service/email.service")

/**
 * user registration controller
 * post request to /api/auth/register
 */
const  registerController =async (req,res)=>{
try{
    const {email,password,name}=req.body

    const isUserAlreadyExist = await userModel.findOne({email:email});
    console.log(isUserAlreadyExist)
    if(isUserAlreadyExist){
      return res.status(400).json({
            success:false,
            message:"user already exist with this email"
        })
    }
    const user = new userModel({
        email:email,
        name:name,
        password:password
    })

    await user.save()
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"3d"})
    res.cookie("token",token)
    
    //sending a registration email to the user after successful registration
    await sendRegistrationEmail(user.email,user.name)

    return res.status(201).json({
 message:"user registered successfull",
 user:{
    _id:user._id,
    name:user.name,
    email:user.email
 }
    })

}catch(error){
    return res.status(500).json({
        success:false,
        message:"Internal server error"
    })
}
}

/**
 * user login controller
 * post request to /api/auth/login
 */
const loginController = async(req,res)=>{
try{
const user = req.user;
const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"3d"})
res.cookie("token",token)

return res.status(200).json({
    success:true,
    message:"user logged in successfully",
    user:{
        userId:user._id,
        name:user.name,
        email:user.email
    }
})
}catch(error){
    return res.status(500).json({
        success:false,
        message:"Internal server error"
    })
}

}
module.exports ={
    registerController,
    loginController
}