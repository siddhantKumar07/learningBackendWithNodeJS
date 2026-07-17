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
        const roomId = [senderId,receiverId].sort.join("_");
        console.log("user joined room:"+roomId);
        socket.join(roomId);
    })

    socket.on("sendMessage",({senderId,receiverId,message})=>{
        const roomId = [senderId,receiverId].sort().join("_");
        console.log("message sent to room:"+roomId);
        io.to(roomId).emit("receiveMessage",{senderId,receiverId,message}); 
        
    })

    socket.on("disconnect",()=>{})
})

}
module.exports = intializeSocket;