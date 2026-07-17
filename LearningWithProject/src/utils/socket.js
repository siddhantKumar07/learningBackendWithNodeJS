const socket = require("socket.io");
const cors = require("cors");

const intializeSocket = (server)=>{
 
const io = socket(server,{
cors:{
    origin:"http://localhost:5173",
}
});
    
}

module.exports = intializeSocket;