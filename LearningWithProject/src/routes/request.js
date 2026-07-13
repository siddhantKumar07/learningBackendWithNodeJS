const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequestModel = require("../model/connectionRequest");
const userModel = require("../model/user");
const checkRequest = require("../middleware/checkRequest");
const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:receiverId",
  userAuth,
  checkRequest,
  async (req, res) => {
    try {
      const senderId = req.user._id;
      const receiverId = req.params.receiverId;
      const status = req.params.status;
      const recieverData = req.recieverData
      const data = await ConnectionRequestModel.create({
        senderId: senderId,
        receiverId: receiverId,
        status: status,
      });

      res.status(200).json({
        message: `you send the request to ${recieverData.firstName} ${recieverData.lastName} successfully`,
        data: data,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
 async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { requestId, status } = req.params;
      const allowedStatus = ["accepted", "rejected"];

      if (!allowedStatus.includes(status)){
        return res.status(400).json({
          message: `${status} is not allowed status`,
        })
      }

      const connectionRequest = await ConnectionRequestModel.findOne({
          _id: requestId,
          receiverId: loggedInUser._id,
             status: "interested",
      })
      if(!connectionRequest){
        return res.status(404).json({
          message: "request not found",
        })
      }
      connectionRequest.status = status;
      await connectionRequest.save();

      res.status(200).json({
        message: `request ${status} successfully`,
        data: connectionRequest,
      });




    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
);

module.exports = requestRouter;
