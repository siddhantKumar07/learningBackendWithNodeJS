const mongooes = require("mongoose");
const validate = require("validator")
const postSchema = new mongooes.Schema({
imageUrl:{
    type:String,
    required:true,
    trim:true,
    validate(value){
        if(!validate.isURL(value)){
            throw new Error("Invalid URL")
        }
    }
},
caption:{
    type:String,
    required:true,
    trim:true,
    maxLength:300
},
})
const postModel=mongooes.model("post",postSchema);

module.exports=postModel;