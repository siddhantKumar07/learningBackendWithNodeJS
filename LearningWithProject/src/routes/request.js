const express = require("express");
const {userAuth} = require("../middleware/auth");
const ConnectionRequestModel = require("../model/connectionRequest");
const userModel = require("../model/user");
const checkRequest = require("../middleware/checkRequest") 
const requestRouter = express.Router();

requestRouter.post("/request/send/:status/:receiverId",userAuth,checkRequest,async(req,res)=>{
  try{
    const senderId = req.user._id;
    const receiverId = req.params.receiverId;
    const status = req.params.status;
   
  const data = await ConnectionRequestModel.create({
      senderId:senderId,
      receiverId:receiverId,
      status:status
    });
  
    res.status(200).json({
      message:`you send the request to ${recieverData.firstName} ${recieverData.lastName} successfully`,
      data:data
    })

  }
  catch(error){
    res.status(500).json({
      message:error.message
    })
  }
})

module.exports = requestRouter;