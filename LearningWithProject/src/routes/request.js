const express = require("express");
const {userAuth} = require("../middleware/auth");
const ConnectionRequestModel = require("../model/connectionRequest");
const userModel = require("../model/user");

const requestRouter = express.Router();

requestRouter.post("/request/send/:interested/:receiverId",userAuth,async(req,res)=>{
  try{
    const senderId = req.user._id;
    const receiverId = req.params.receiverId;
    const interested = req.params.interested;
   
    const recieverData= await userModel.findById(receiverId);
    if(!recieverData){
      return res.status(404).json({
        message:"receiver not found"
      })
    }
  const data = await ConnectionRequestModel.create({
      senderId:senderId,
      receiverId:receiverId,
      interested:interested
    });
  
    res.status(200).json({
      message:`you send the request to ${recieverData.firstName} ${recieverData.lastName} successfully`,
      data:data
    })

  }catch(errorr){
    res.status(500).json({
      message:error.message
    })
  }
})

module.exports = requestRouter;