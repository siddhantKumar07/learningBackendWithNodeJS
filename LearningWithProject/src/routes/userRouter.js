const express = require("express");
const {userAuth} = require('../middleware/auth')
const userRouter = express.Router();
const ConnectionRequestModel = require('../model/connectionRequest')
const userModel = require('../model/user')

// it will return all the connection which is accepted
userRouter.get("/user/connection",userAuth,async(req,res)=>{
   try{
     const loggedInUser = req.user;
    const {_id}= loggedInUser;
    const connections =await ConnectionRequestModel.find({
        receiverId:_id,
        status:"accepted"
    })
    if(connections.length===0){
        res.status(404).json({
            message:"connections not found"
        })
    }
   const connectionName= await Promise.all(
    connections.map(async(connection)=>{
    const user = await userModel.findById(connection.senderId);
    return user.firstName+" "+user.lastName;
   })
)
     res.status(200).json({
        message:"connection is fetched",
        connections:connections,
        connectionNames:connectionName
     })

   }catch(error){
    res.status(500).json({
        message:error.message
    })
   }
})

// for to get all the pending connection request for the logged in user

userRouter.get("/user/request",userAuth,async(req,res)=>{
    try{
   const {_id} = req.user;
    const pendingRequest = await ConnectionRequestModel.find({
        receiverId: _id,
        status: "interested"
    })
    if(pendingRequest.length===0){
        res.status(404).json({
            message:"pending request is not found"
        })
    }
    const pendingRequestNames = await Promise.all(
        pendingRequest.map(async(request)=>{
            const user = await userModel.findById(request.senderId);
            return user.firstName+" "+user.lastName;
        })
    )
    res.status(200).json({
        message:"pending request is fetched successfully",
        pendingRequest:pendingRequest,
        pendingRequestNames:pendingRequestNames
    })
    } catch(error){
        res.status(500).json({
            message:error.message
        })
    }
})


module.exports = userRouter;