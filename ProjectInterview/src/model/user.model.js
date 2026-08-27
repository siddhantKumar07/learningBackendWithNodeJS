const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  userName:{
    type:String,
    required:true,
    unique:[true,"UserName is already taken"]
  },
  email:{
 type:String,
 required:true,
 unique:[true,"Email is already taken"]
  }
})
const userModel = mongoose.model("user",userSchema)
module.exports = userModel