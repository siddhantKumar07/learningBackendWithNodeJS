
const jwt = require('jsonwebtoken');

const CreateMusicController = (req,res)=>{
//   const {token} = req.cookies;
//   const decoded = jwt.verify(token, process.env.JWT_SECRET);
//   console.log(decoded)

    res.status(200).json({
        message:"Music created successfully"
    })
    
}
module.exports = CreateMusicController;