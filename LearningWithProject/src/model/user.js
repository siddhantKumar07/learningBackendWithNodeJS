const mongooes = require('mongoose');

const userSchema =new mongooes.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
    },
    emailId:{
        type:String,
        required:true,
        unique:true
    },
    age:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    photoUrl:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    },
    about:{
        type:String,
        default:"this is the default about text."
    },
    skills:{
        type:[String],
        default:[]
    }
})
const userModel = mongooes.model("user",userSchema);

module.exports = userModel;