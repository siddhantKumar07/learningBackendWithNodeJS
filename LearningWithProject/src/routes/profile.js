const express = require("express");
const {userAuth} = require("../middleware/auth");
const {checkChanges} = require("../utils/validation");
const userModel = require("../model/user");
const bcrypt = require("bcrypt");
const profileRouter = express.Router();

profileRouter.get("/profile/view",userAuth,async(req,res)=>{
   const user = req.user;
   res.status(200).json({
    message:"user fetched successfully",
    user:user
   })
  })

  profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
    try{
      const loggedInUser = req.user
      const data= req.body;
      checkChanges(data);//it will check whether the data is allowed to update or not if not then it will throw an error
       const updatedUser = await userModel.findByIdAndUpdate(loggedInUser._id,data,{new:true,runValidators:true});
       res.status(200).json({
        message:`${updatedUser.firstName} ${updatedUser.lastName}, your profile has been updated successfully`,
        updatedUser:updatedUser
       })
    }catch(error){
      res.status(500).json({
        message:error.message
      })
    }
  })

profileRouter.delete("/profile/delete",userAuth,async(req,res)=>{
  try{
  const user = req.user;
 await userModel.findByIdAndDelete(user._id);

 res.status(200).json({
  message:"user deleted successfully"
 })


  }catch(error){
    res.status(500).json({
      message:error.message
    })
  }


  })

  profileRouter.post("/",userAuth,async(req,res)=>{
    try{
     const user = req.user;
     const{oldPassword}=req.body;
     const{newPassword}=req.body;

     const isMatch= await bcrypt.compare(oldPassword,user.password);
     if(!isMatch){
      return res.status(400).json({
        message:"old password is incorrect"
      })
    }
    else{
      const hashedNewPassword = await bcrypt.hash(newPassword,10);
      const updatedUser = await userModel.findByIdAndUpdate(user._id,{password:hashedNewPassword},{new:true,runValidators:true});

      res.status(200).json({
        message:`${updatedUser.firstName} ${updatedUser.lastName}, your password has been updated successfully`,
      })
    }
  }
    catch(error){
      res.status(500).json({
        message:error.message
      })
    }
  })
module.exports = profileRouter;