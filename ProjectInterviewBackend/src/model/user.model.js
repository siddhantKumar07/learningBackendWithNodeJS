const mongoose = require("mongoose")
const validator = require("validator");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config();
const userSchema = new mongoose.Schema({
  userName:{
    type:String,
    required:true,
    lowercase:true,
    unique:[true,"UserName is already taken"],
    minlength:[3,"UserName must be at least 3 characters long"],
    maxlength:[20,"UserName must be at most 20 characters long"]
  },
  email:{
 type:String,
 required:true,
 lowercase:true,
 unique:[true,"Email is already taken"],
 validate:{
    validator:validator.isEmail,
    message:"Please enter a valid email"
 }
  },
  password:{
    type:String,
    required:true,
    minlength:[8,"Password must be at least 6 characters long"],
    validate:{
        validator:validator.isStrongPassword,
        message:"Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    },
    select:false
  }
})
// this will run before saving the user to the database and will hash the password before saving it to the database when user.save() is called
userSchema.pre("save",async function(){
  if(!this.isModified("password")){
    return;
  }
  const hash = await bcrypt.hash(this.password,10);
  this.password = hash;
  return;
})

// Generate a JWT token for the user
userSchema.methods.jwtToken = function(){
  return jwt.sign({id:this._id,username:this.userName},process.env.JWT_SECRET,{expiresIn:"7d"} )
}

// Compare the provided password with the hashed password stored in the database
userSchema.methods.comparePassword = async function(password){
const isMatch =await bcrypt.compare(password,this.password);
return isMatch;
}
const userModel = mongoose.model("user",userSchema)
module.exports = userModel