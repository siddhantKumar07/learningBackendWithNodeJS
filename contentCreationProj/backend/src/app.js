const express = require("express");
const axios = require("axios");
const multer = require("multer");
const app = express();
app.use(express.json());// to parse the incoming request as js object

const upload = multer({//multer is used to upload the file
    storage:multer.memoryStorage(),
    limits:{
        fileSize:5*1024*1024 // 5mb
    }
})
app.post("/createPost",upload.single("image"),async(req,res)=>{
    try{
        const {caption} = req.body;
        if(!caption){
            return res.status(400).json({
                message:"Caption is required"
            })
        }
        const image = req.file;
        if(!image){
            return res.status(400).json({
                message:"Image is required"
            })
        }
        console.log(image);
        console.log(caption);
        return res.status(201).json({
            message:"Post created successfully",
        })
      
    }catch(err){
      res.status(500).json({
        message:err.message,
      })
    }
})








module.exports = app;