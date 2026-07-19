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
        socket.join(roomId);
    })

    socket.on("sendMessage", async ({ senderName, senderId, receiverId,receiverName, message }) => {
        const roomId = createRoomId(senderId, receiverId);
        try {
            const user = await chatModel.findOne({ participants: { $all: [senderId, receiverId] } });

            if (user) {
                user.messages.push({ senderId, message: message });
                await user.save();
            } else {
                const newChat = new chatModel({
                    participants: [senderId, receiverId],
                    messages: [{ senderId, message: message }]
                });
                await newChat.save();
            }

            io.to(roomId).emit("receiveMessage", {
                senderName,
                senderId,
                receiverName,
                message,
                timestamp: new Date().toISOString()
            });
        } catch (err) {
            console.log(err);
        }
    })

    socket.on("disconnect",()=>{})
})

}
module.exports = intializeSocket;