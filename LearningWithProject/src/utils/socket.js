const socket = require("socket.io");
const cors = require("cors");
const crypto = require("crypto");
const { createRequire } = require("module");
const chatModel = require("../model/chat");
const createRoomId=(senderId,receiverId)=>{
    return crypto.createHash("sha256").update([senderId,receiverId].sort().join("_")).digest("hex");
}

const intializeSocket = (server)=>{
 
const io = socket(server,{
cors:{
    origin:"http://localhost:5173",
}
});
io.on("connection",(socket)=>{
   
    socket.on("joinChat",({senderId,receiverId})=>{
        const roomId = createRoomId(senderId,receiverId);
        console.log("user joined room:"+roomId);
        socket.join(roomId);
    })

    socket.on("sendMessage",async({firstName,senderId,receiverId,receiverName,message})=>{
        const roomId = createRoomId(senderId,receiverId);
        console.log("message sent to room:"+roomId);
        console.log("message:"+message+" from:"+firstName );
       
        try{
   const user = await chatModel.findOne({participants:{$all:[senderId,receiverId]}});
   if(user){
    user.messages.push({senderId,text:message});
    user.save();
   }else{
    const newChat = await new chatModel({
        participants:[senderId,receiverId],
        messages:[{senderId,text:message}]
    })
    await newChat.save();
        io.to(roomId).emit("receiveMessage",{firstName,receiverName,message,timestamp:new Date().toISOString()}); 

   }

        }catch(err){
            console.log(err);
        }



        
    })

    socket.on("disconnect",()=>{})
})

}
module.exports = intializeSocket;