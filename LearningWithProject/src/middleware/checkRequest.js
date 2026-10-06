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

    if(senderId.toString() === receiverId.toString()){
      return res.status(400).json({
        message:"you can't send the request to yourself"
      })
    }

    const existingRequests = await ConnectionRequestModel.find({
      $or:[
        {
          senderId:senderId,
          receiverId:receiverId
        },
        {
          senderId:receiverId,
          receiverId:senderId
        }
      ]
    });

    const existingRequest = existingRequests.find((request) =>
      request.senderId.toString() === senderId.toString()
    );
    const reverseRequest = existingRequests.find((request) =>
      request.senderId.toString() === receiverId.toString()
    );

    if(existingRequest){
      const messageByStatus = {
        interested: `you already sent a request to ${recieverData.firstName} ${recieverData.lastName}`,
        ignored: `you already ignored ${recieverData.firstName} ${recieverData.lastName}`,
        accepted: `you are already connected with ${recieverData.firstName} ${recieverData.lastName}`,
        rejected: `your previous request to ${recieverData.firstName} ${recieverData.lastName} was rejected`,
      };

      return res.status(409).json({
        message: messageByStatus[existingRequest.status],
      });
    }

    if(reverseRequest){
      const messageByStatus = {
        interested: `${recieverData.firstName} ${recieverData.lastName} already sent a request to you`,
        ignored: `${recieverData.firstName} ${recieverData.lastName} already ignored your request`,
        accepted: `you are already connected with ${recieverData.firstName} ${recieverData.lastName}`,
        rejected: `${recieverData.firstName} ${recieverData.lastName} rejected your previous request`,
      };

      return res.status(409).json({
        message: messageByStatus[reverseRequest.status],
      });
    }
req.recieverData = recieverData;
    next();
    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

module.exports = checkRequest;