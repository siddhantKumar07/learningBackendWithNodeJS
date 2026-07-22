const validator = require("validator");
const bcrypt = require("bcrypt")
// middleware is used to validate the request body before it reaches the controller
const authMiddleware = async(req, res, next) => {
const {name, email, password} = req.body;
if(!name || !email || !password){
    return res.status(400).json({
        message:"All fields are required",
    })
}
if(!validator.isStrongPassword(password)){
    return res.status(400).json({
        message:"Password must be at least 6 characters long and should be have 1 uppercase, 1 lowercase, 1 number and 1 symbol",
    })}
 const hashPass =await bcrypt.hash(password,10);

if(!validator.isEmail(email)){
    return res.status(400).json({
        message:"Invalid email address",
    })}




  req.body.name = name.toLowerCase();
  req.body.email = email.toLowerCase();
  req.body.password = hashPass;  
next();
}
module.exports = authMiddleware;