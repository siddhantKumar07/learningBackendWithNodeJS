const userModel = require("../model/user");
const ConnectionRequestModel = require("../model/connectionRequest");
    const mongoose = require("mongoose");

const  checkRequest = async(req,res,next)=>{
    try{

    const senderId = req.user._id;
    const receiverId = req.params.receiverId;
    const status = req.params.status;

      const allowedStatus =["interested","ignored"]
    if(!allowedStatus.includes(status)){
      return res.status(400).json({
        message:`${status} is not allowed status`
      })
    }


    // for to check whether the receiverId is valid or not
if (!mongoose.Types.ObjectId.isValid(receiverId)) {
  return res.status(400).json({
    message: "invalid receiverId",
  });
}

    const recieverData= await userModel.findById(receiverId);
    if(!recieverData){
      return res.status(404).json({
        message:"receiver not found"
      })
    }
    // check whether the request is already sent or not

    const existRequest = await ConnectionRequestModel.findOne({
      $or:[
        {
          senderId:senderId,
          receiverId:receiverId,
          status:status
        },
        {
          senderId:receiverId,
          receiverId:senderId,
          status:status
        }
      ]
    })
       
    if(existRequest&&existRequest.status=="interested"){
        if(existRequest.senderId.toString() === senderId.toString() ){
          return res.status(400).json({
            message:`you already send the request to ${recieverData.firstName} ${recieverData.lastName}`
          })
        }
        return res.status(400).json({
          message:`${recieverData.firstName} ${recieverData.lastName} already send the request to you`
        })
    }

    if(existRequest&&existRequest.status=="ignored"){
        if(existRequest.senderId.toString() === senderId.toString() ){
          return res.status(400).json({
            message:`you already ignored the request from ${recieverData.firstName} ${recieverData.lastName}`
          })
        }
        return res.status(400).json({
          message:`${recieverData.firstName} ${recieverData.lastName} already ignored the request from you`
        })
    }



    // for to check whether the user is trying to send the request to himself or not
    if(senderId.toString() === receiverId.toString()){
      return res.status(400).json({
        message:"you can't send the request to yourself"
      })
    }

    next();
    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

module.exports = checkRequest;