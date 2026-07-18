const socket = require("socket.io");
const cors = require("cors");

const intializeSocket = (server)=>{
 
const io = socket(server,{
cors:{
    origin:"http://localhost:5173",
}
});
io.on("connection",(socket)=>{
   
    socket.on("joinChat",({senderId,receiverId})=>{
        const roomId = [senderId,receiverId].sort().join("_");
        console.log("user joined room:"+roomId);
        socket.join(roomId);
    })

    socket.on("sendMessage",({firstName,senderId,receiverId,receiverName,message})=>{
        const roomId = [senderId,receiverId].sort().join("_");
        console.log("message sent to room:"+roomId);
        console.log("message:"+message+" from:"+firstName );
        io.to(roomId).emit("receiveMessage",{firstName,receiverName,message}); 
        
    })

    socket.on("disconnect",()=>{})
})

}
module.exports = intializeSocket;