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
userSchema.pre("save",async function(){// this will run before saving the user to the database and will hash the password before saving it to the database when user.save() is called
    if(!this.isModified("password")){
        return ;
    }
const hash = await bcrypt.hash(this.password,10);
this.password = hash;
return ;

})

userSchema.methods.comparePass = async function(password){
      return await bcrypt.compare(password,this.password)
}


const userModel = mongoose.model("user",userSchema);
module.exports = userModel;