const userModel = require("../model/user.model");
const registerController = (req,res)=>{
   try{
     const {username,email,password} = req.body;


    const user = new userModel({
        userName:username,
        email:email,
        password:password
    });
    const token = user.jwtToken();//this is a mongoose method which returns the token
    
     res.cookie("token",token,{
        httpOnly:true,
     })

    user.save()
    return res.status(201).json({user:user,message:"User registered successfully"});
   }catch(err){
    return res.status(500).json({message:"Internal server error",error:err.message});
   }

}

// login controller
const loginController  = async (req,res)=>{
   const user = req.user;
   const isMatch = user.comparePassword(req.body.password);
   if(!isMatch){
      return res.status(400).json({message:"Invalid credentials"});
   }
   const token = user.jwtToken();
   res.cookie("token",token,{
      httpOnly:true,
   })
   return res.status(200).json({user:{username:user.userName,email:user.email},message:"User logged in successfully"});
}
module.exports = {registerController,loginController};