const userModel = require("../model/user.model")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const  registerController = (req,res)=>{
    const {email,password,name}=req.body

    const isUserAlreadyExist = userModel.find({email:email});
    if(isUserAlreadyExist){
        res.status(400).json({
            success:false,
            message:"user already exist with this email"
        })
    }
    const user = new user({
        email:email,
        name:name,
        password:password
    })

    await user.save()
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"3d"})
    res.cookie("token",token)
    res.status(201).json({
 message:"user registered successfull",
 user:{
    _id:user._id,
    name:user.name,
    email:user.email
 }
    })
}

const loginController = async(req,res)=>{
const user = req.user;
const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"3d"})
res.cookie("token",token)

return res.status(200).json({
    success:true,
    message:"user logged in successfully",
    user:user
})

}
module.exports ={
    registerController,
    loginController
}