const mongoose = require("mongoose")
const jwt = require('jsonwebtoken');
const userModel = require("../models/user.model")
const uploadImage = require("../service/imageUpload.service")
const musicModel = require("../models/music.model")

const CreateMusicController =async (req,res)=>{

try{
const user = req.user;
const {title}= req.body
const musicFile = req.file;
console.log("user",user);
console.log("title",title);
console.log("musicFile",musicFile);
    const response = await uploadImage(musicFile.buffer,musicFile.originalname);
    if(response.error){
        return res.status(500).json({
            message:response.message
        })
    }
const url = response.url;

const newMusic= await musicModel.create({
    url,
    title,
    artist:user.id
}) 

const musicWithArtist = await musicModel
  .findById(newMusic._id)
  .populate("artist",["username"]);

console.log(musicWithArtist.artist);
console.log("user",musicWithArtist);








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