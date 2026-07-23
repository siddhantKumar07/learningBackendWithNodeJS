const mongoose = require('mongoose');
const validator = require('validator');
const musicSchema = new mongoose.Schema({
url:{
    type:String,
    required:true,
    validate:{
        validator:validator.isURL,
        message:"Please enter a valid URL"
    }
},
title:{
    type:String,
    required:true,
    trim:true
},
artist:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user",
    required:true
}
})
const musicModel = mongoose.model("music",musicSchema);
module.exports = musicModel;