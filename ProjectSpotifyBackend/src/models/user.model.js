const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema({
username:{
    type:String,
    required:true,
     lowercase:true,
    unique:true,
    minLength:3,
    maxLength:20
},
email:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    validate: {
    validator: validator.isEmail,
    message: "Invalid Email"
  }
},
password:{
    type:String,
    required:true,
    minLength:8,
    validate:{
        validator:validator.isStrongPassword,
        message:"Password is not strong enough"
    }
},
role:{
    type:String,
    toLowerCase:true,
    enum:["user","artist"],
    default:"user"
}
})
const userModel = new mongoose.model("user",userSchema);
module.exports = userModel;