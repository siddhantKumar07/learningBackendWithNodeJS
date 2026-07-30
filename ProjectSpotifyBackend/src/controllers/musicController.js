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

const musicWithArtist = await musicModel
  .findById(newMusic._id)
  .populate("artist",["username"]);

return res.status(200).json({
        message:"Music created successfully",
        music:musicWithArtist
    })
}catch(err){
return res.status(500).json({
    message:err.message 
})
}
    
}

const getAllMusicController = async (req, res) => {
const user = req.user;
try{
  if(user.role !== "user") {
    return res.status(403).json({
      message: "You are not authorized to view music",
    });
  }
    const allMusic = await musicModel.find().populate("artist",["username"]);
    return res.status(200).json({
        message:"All music fetched successfully",
        music:allMusic
    })

}
catch(err){
    return res.status(500).json({
        message:err.message
    })
}



}

const getAllAlbumsController = async(req,res)=>{
  try{
const allAlbums = await albumModel.find().populate("musics",["title","url"]).populate("artist",["username"]);
return res.status(200).json({
  message:"All albums fetched successfully",
  albums:allAlbums
})
  }catch(err){
    return res.status(500).json({
      message:err.message
    })
  }
}

const  CreateAlbumController = async (req, res) => {
  try {
    let album;
    const user = req.user;
    const { title, musicId } = req.params;

    if(user.role !== "artist"){
    return res.status(403).json({
        message:"you are not authorized to create music"
    })
  }
    const existingAlbum = await albumModel.findOne({ title, artist: user.id });
    
    // this will check if the music already exists in the album, if it does, it will return an error message
    const isMusicExist = existingAlbum? existingAlbum.musics.includes(musicId) : false;
    if (isMusicExist) {
      return res.status(400).json({
        message: "Music already exists in the album",
      });
    }

    

    if (existingAlbum) {
      existingAlbum.musics.push(musicId);
      album = await existingAlbum.save();
    } else {
      album = await albumModel.create({
        title,
        musics: [musicId],
        artist: user.id,
      });
    }

    const albumWithMusics = await albumModel
      .findById(album._id)
      .populate("musics", ["title", "url"]);

    return res.status(200).json({
      message: "Album processed successfully",
      album: albumWithMusics,
    });
  } catch(err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {CreateMusicController,CreateAlbumController,getAllMusicController};