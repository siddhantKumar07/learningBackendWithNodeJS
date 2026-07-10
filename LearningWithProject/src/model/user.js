const mongooes = require("mongoose");
const validator = require("validator");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const userSchema = new mongooes.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  lastName: {
    type: String,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    maxLength:75,
    minLength:7,
    validate(value) {
        if (!validator.isEmail(value)) {
            throw new Error("Invalid email");
        }
    }
  },
  age: {
    type: Number,
    required: true,
    min:18,
    max:100
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength:8,
    maxLength:150,
    validate(value){
        if(!validator.isStrongPassword(value)){
            throw new Error("password is not strong enoungh")
    }
  }
},
  gender: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    maxLength:15,
    validate(value){
      if(!["male","female","other"].includes(value)){
        throw new Error("gender is not valid")
      }
    }
  },
  photoUrl: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
  validate(value){
    if(!validator.isURL(value)){
        throw new Error("Invalid URL");
    }
}
    },
  about: {
    type: String,
    default: "this is the default about text.",
    trim: true,
    maxLength:100
  },
  skills: {
    type: [String],
    default: [],
    validate(value){
     if(value.length>10){
        throw new Error("you can add only 10 skills")
     }
     value.forEach((skill)=>{
   if(skill.length>20){
    throw new Error("skill name must be less than or equal to 20")
   }
     })
    }
  },
}
,{
    timestamps:true
});
userSchema.methods.getJWT= function(){
  const user = this;
  const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});// json web token is used to send the user id to the client side in the form of token so that the client can use it to access the protected routes. it generates a token using the user id and the secret key which is stored in the environment variable. the token is then sent to the client side in the form of cookie so that the client can use it to access the protected routes.
  return token;
}
const userModel = mongooes.model("user", userSchema);

module.exports = userModel;
