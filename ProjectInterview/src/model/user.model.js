const mongoose = require("mongoose")
const validator = require("validator");
const userSchema = new mongoose.Schema({
  userName:{
    type:String,
    required:true,
    unique:[true,"UserName is already taken"],
  },
  email:{
 type:String,
 required:true,
 unique:[true,"Email is already taken"],
 validator:{
    validate:validator.isEmail,
    message:"Please enter a valid email"
 }

  },
  password:{
    type:String,
    required:true,
    minlength:[6,"Password must be at least 6 characters long"],
    validator:{
        validate:validator.isStrongPassword,
        message:"Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    }
  }
})
const userModel = mongoose.model("user",userSchema)
module.exports = userModel