const jwt = require("jsonwebtoken")
const createMusicMiddleware = (req,res,next)=>{
    const cookies = req.cookies;
    const {token} = cookies;
  if(!token){
    return res.status(401).json({
        message:"Unauthorized"
    })
  }
  if(role !== "artist"){
    return res.status(403).json({
        message:"you are not authorized to create music"
    })
  }
  

}
module.exports = createMusicMiddleware;