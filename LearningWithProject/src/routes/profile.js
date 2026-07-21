const express = require("express");
const {userAuth} = require("../middleware/auth");
const {checkChanges,validatePassword} = require("../utils/validation");
const userModel = require("../model/user");
const bcrypt = require("bcrypt");
const multer = require("multer");
const uploadImage = require("../service/storage.service");
const profileRouter = express.Router();

profileRouter.get("/profile/view",userAuth,async(req,res)=>{
   const user = req.user;
   res.status(200).json({
    message:"user fetched successfully",
    user:user
   })
  })

const upload = multer({
  storage:multer.memoryStorage(),
  limits:{
    fileSize:5*1024*1024 // 5mb
  }
})

  profileRouter.patch("/profile/edit",upload.single("image"),userAuth,async(req,res)=>{
    try{
      const loggedInUser = req.user
      const data= req.body;
      const image = req.file;
      if(!req.file){
        return res.status(400).json({
          message:"Image is required"
        })
      }
      const result = await uploadImage(req.file.buffer,req.file.originalname);
      if(result.error){
        return res.status(500).json({
          message:result.message
        })
      }
      checkChanges(data);//it will check whether the data is allowed to update or not if not then it will throw an error
      data.photoUrl=result.url;
       const updatedUser = await userModel.findByIdAndUpdate(loggedInUser._id,data,{new:true,runValidators:true});
       const {firstName,lastName,age,gender,photoUrl,about,skills=[]} = updatedUser;
       res.status(200).json({
        message:`${updatedUser.firstName} ${updatedUser.lastName}, your profile has been updated successfully`,
        updatedUser:{
          firstName,lastName,age,gender,photoUrl,about,skills
        }
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

  profileRouter.post("/profile/updatePassword",userAuth,async(req,res)=>{
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
      if(validatePassword(newPassword)){
      const hashedNewPassword = await bcrypt.hash(newPassword,10);
      const updatedUser = await userModel.findByIdAndUpdate(user._id,{password:hashedNewPassword},{new:true,runValidators:true});

     return res.status(200).json({
        message:`${updatedUser.firstName} ${updatedUser.lastName}, your password has been updated successfully`,
      })
    }
    }
  }
    catch(error){
      res.status(500).json({
        message:error.message
      })
    }
  })
module.exports = profileRouter;