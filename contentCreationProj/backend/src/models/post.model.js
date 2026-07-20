const mongooes = require("mongoose");

const postSchema = new mongooes.Schema({

})
const postModel=mongooes.model("post",postSchema);

module.exports=postModel;