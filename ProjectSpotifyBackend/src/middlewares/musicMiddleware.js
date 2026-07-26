const jwt = require("jsonwebtoken")
const createMusicMiddleware = (req,res,next)=>{
    const cookies = req.cookies;
    const {token} = cookies;
    console.log("token",token)
    console.log("role",token.role)
}
module.exports = createMusicMiddleware;