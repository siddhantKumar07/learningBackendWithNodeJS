const mongooese = require("mongoose");

const userSchema = new mongooese.Schema({

    name:{
        type:String,
        required:true,
        minLength:3,
        lowercase:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },
    password:{ 
        min:6,
        type:String,
        required:true,
    },
})
const userModel = new mongooese.model("user",userSchema);
module.exports = userModel;