const mongoose = require("mongoose")
const jwt = require('jsonwebtoken');
const CreateMusicController = (req,res)=>{
const user = req.user;
const {title}= req.body
const musicFile = req.file;
console.log("user",user);
console.log("title",title);
console.log("musicFile",musicFile);
try{
const user = 









return res.status(200).json({
        message:"Music created successfully"
    })
}catch(err){
return res.status(500).json({
    message:err.message 
})
}
    
}
module.exports = CreateMusicController;