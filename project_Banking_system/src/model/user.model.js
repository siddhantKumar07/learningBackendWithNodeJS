const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require("bcrypt")
const userSchema =new  mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name"],
        maxLength:[30,"Name cannot exceed 30 characters"],
        minLength:[4,"Name should have more than 4 characters"],
        tolowercase:true
    },
   email:{
    type:String,
    required:[true,"Please enter your email"],
    unique:[true,"Email already exists"],
   validate:{
    validator:validator.isEmail,
    message:"Please enter a valid email"
   }
   },
   password:{
    type:String,
    required:[true,"password is required"],
    validate:{
        validator = validator.isStrongPassword,
        message:"password should be atleast 8 character long ,should be one special symbol,  number and one uppercase letter"
    },
    select:false 
   }
},{
    timestamps:true
})
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next();
    }
const hash = await bcrypt.hash(this.password,10);
this.password = hash;
return next();

})


const userModel = mongoose.model("User",userSchema);
module.exports = userModel;