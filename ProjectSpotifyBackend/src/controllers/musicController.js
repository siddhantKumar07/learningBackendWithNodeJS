const mongoose = require("mongoose")
const jwt = require('jsonwebtoken');
const userModel = require("../models/user.model")
const uploadImage = require("../service/imageUpload.service")
const musicModel = require("../models/music.model");
const albumModel = require("../models/album.model");

const CreateMusicController =async (req,res)=>{
try{
const user = req.user;
const {title}= req.body
const musicFile = req.file;
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

// const musicWithArtist = await musicModel
//   .findById(newMusic._id)
//   .populate("artist",["username"]);

return res.status(200).json({
        message:"Music created successfully"
    })
}catch(err){
return res.status(500).json({
    message:err.message 
})
}
    
}

const  CreateAlbumController = async (req,res)=>{
try{
const user = req.user;
const {title,musicId} = req.body;

const existingAlbum = await albumModel.findOne({title:title,artist:user.id});
if(existingAlbum){
existingAlbum.musics.push(musicId);
await existingAlbum.save();
return res.status(200).json({
    message:"Music added to existing album successfully"
})
}
const newAlbum = await albumModel.create({
    title:title,
    musics:[musicId],
    artist:user.id
})
return res.status(200).json({
    message:"Album created successfully"
})


}catch(err){
    res.status(500).json({
        message:err.message
    })

}


}
module.exports = {CreateMusicController,CreateAlbumController};