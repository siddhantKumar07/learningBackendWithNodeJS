const express = require("express");
const {userAuth} = require('../middleware/auth')
const userRouter = express.Router();
const ConnectionRequestModel = require('../model/connectionRequest')
const userModel = require('../model/user')
userRouter.get("/user/connection",userAuth,async(req,res)=>{
   try{
     const loggedInUser = req.user;
    const {_id}= loggedInUser;
    const connections =await ConnectionRequestModel.find({
        receiverId:_id,
        status:"accepted"
    })
    if(!connections){
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



module.exports = userRouter;