const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");
const registerAuthController = async (req ,res)=>{
const {email,password,username,role} = req.body;
try{
const hashedPass = await bcrypt.hash(password,10);
const user = await userModel.create({
    username:username,
    email:email,
    password:hashedPass,
    role:role
});

res.status(201).json({
    message:"User created successfully",
    user:user
})

}catch(error){

}
}
module.exports = registerAuthController;