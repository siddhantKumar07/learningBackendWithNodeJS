const mongooes = require("mongoose");

const postSchema = new mongooes.Schema({
imageUrl:{
    type:String,
    required:true,
    trim:true
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