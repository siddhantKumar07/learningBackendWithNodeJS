const { userAuth } = require("../middleware/auth");
const chatModel = require("../model/chat");
const express = require("express");
const messageRouter = express.Router();

messageRouter.get("/messages/:senderId/:receiverId",userAuth,async(req,res)=>{
    
try{
const {senderId,receiverId} = req.params;
const chat = await chatModel.findOne({participants:{$all:[senderId,receiverId]}}).populate("messages.senderId","firstName lastName photoUrl");

if(!chat){
    return res.status(404).json({
        message:"No chat found between the users"
    })
}
return res.status(200).json({
    message:"chat fetched successfully",
    chat:chat
})

}catch(error){
    res.status(500).json({
        message:error.message
    })

}

})
module.exports = messageRouter;