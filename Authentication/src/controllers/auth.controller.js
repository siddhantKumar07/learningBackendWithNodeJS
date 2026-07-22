const userModel = require("../model/user.model");

const register =async (req, res) => {// controller function to handle user registration
  const { name, email, password } = req.body;
    try{
         await userModel.create({
        name: name,
        email: email,
        password: password,
     })
     res.status(201).json({
        message:"User registered successfully",
        data:{
            name:name,
            email:email,
            password:password,
        }
     })
    }catch(error){
        res.status(500).json({
            message:"Error registering user",
            error:error.message,
        })
    }
  
}
module.exports = { register };