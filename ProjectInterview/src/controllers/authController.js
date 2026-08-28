const userModel = require("../model/user.model");
const registerController = (req,res)=>{
   try{
     const {username,email,password} = req.body;


    const user = new userModel({
        userName:username,
        email:email,
        password:password
    });
    const token = user.jwtToken();
    
     res.cookies("token",token,{
        httpOnly:true,
     })

    user.save()
    return res.status(201).json({user:user,message:"User registered successfully"});
   }catch(err){
    return res.status(500).json({message:"Internal server error"});
   }

}