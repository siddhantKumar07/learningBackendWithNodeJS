const jwt = require("jsonwebtoken");
const musicModel = require("../models/music.model");

const isLoggedIn = (req,res,next)=>{
    const {token} = req.cookies || {};
    if(!token){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }
try{
      const decoded = jwt.verify(token,process.env.JWT_SECRET);
    req.user = decoded;
    next();
}catch(err){
  return res.status(401).json({
    message:"Invalid token"
  })
}
}

const createMusicMiddleware = (req, res, next) => {
  const user = req.user;
  const musicFile = req.file;
  const { title } = req.body;

  
  if(user.role !== "artist"){
      return res.status(403).json({
          message:"you are not authorized to create music"
      })
    }
  if (!musicFile || !title) {
    return res.status(400).json({
      message: "music file and title are required",
    });
  }
  next();
};


const createAlbumMiddleware = async(req, res, next) => {
try{
const {musicId,title} = req.params;

const user = req.user;
if(user.role !== "artist"){
    return res.status(403).json({
        message:"you are not authorized to create music"
    })
  }
  if(!title || !musicId){
    return res.status(400).json({
        message:"title and musicId are required"
    })
  }
  const isMusicExist = await musicModel.findById(musicId);
if(!isMusicExist){
    return res.status(404).json({
        message:"Music not found"
    })
}
    next();
}catch(err){
    return res.status(500).json({
        message:err.message
    })
}
}
module.exports = {createMusicMiddleware,createAlbumMiddleware,isLoggedIn};
