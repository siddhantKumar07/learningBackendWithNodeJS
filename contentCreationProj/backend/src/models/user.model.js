const mongooes = require("mongoose");

const userSchema = new mongooes.Schema({


})
const userModel = mongooes.model("user",userSchema);


module.exports = userModel;