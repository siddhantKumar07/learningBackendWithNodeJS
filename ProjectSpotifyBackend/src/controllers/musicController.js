const mongoose = require("mongoose")
const jwt = require('jsonwebtoken');
const userModel = require("../models/user.model")
const uploadImage = require("../service/imageUpload.service")
const CreateMusicController =async (req,res)=>{
const user = req.user;
const {title}= req.body
const musicFile = req.file;
console.log("user",user);
console.log("title",title);
console.log("musicFile",musicFile);
try{
    const response = await uploadImage(musicFile.buffer,musicFile.originalname);
    if(response.error){
        return res.status(500).json({
            message:response.message
        })
    }
const user = await userModel.findById(user.id) 










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