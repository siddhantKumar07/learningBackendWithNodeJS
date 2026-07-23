const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");
const registerAuthController = async (req ,res)=>{
const {email,password,username,role} = req.body;
try{
    const existUser = await userModel.findOne({
        $or:[
            {email:email},
            {username:username}
        ]
    })
    if(existUser){
        return res.status(400).json({
            message:"User already exists"
        })
    }
const hashedPass = await bcrypt.hash(password,10);
const user = await userModel.create({
    username:username,
    email:email,
    password:hashedPass,
    role:role
});

return res.status(201).json({
    message:"User created successfully",
    user:user
})

}catch(error){
    return res.status(500).json({
        message:"Error creating user",
        error:error.message
    })
}
}
module.exports = registerAuthController;