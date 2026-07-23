const validator = require("validator");
const registerAuthMiddleware= (req,res,next)=>{
    const {username,email,password,role} = req.body;
    if(!username || !email || !password || !role) {
        return res.status(400).json({message:"All fields are required"});
    }
    if(!username.length>7&&!username.length<21){
        res.status(400).json({
            message:"username must be at least  8 characters long and less than 21 characters long"
        })
    }
    if(!validator.isEmail(email)){
        res.status(400).json({
            message:"Invalid email"
        })
    }
    if(!validator.isStrongPassword(password)){
        res.status(400).json({
            message:"Password is not strong enough"
        })
    }
    if(!["user","artist"].includes(role)){
        res.status(400).json({
            message:"Role must be either user or artist"
        })
    }
    next();
}
module.exports = registerAuthMiddleware;