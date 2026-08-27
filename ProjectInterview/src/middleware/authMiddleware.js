const registerMiddleware = (req,res,next)=>{
const {username,email,password} = req.body;
if(!username || !email || !password){
    return res.status(400).json({message:"Please provide all required fields"});
}

}

module.exports = {registerMiddleware};