const express = require("express");
const axios = require("axios");
const multer = require("multer");
const postModel = require("./models/post.model");
const {uploadImage} = require("./services/storage.service");
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
        const result = await uploadImage(image.buffer,image.originalname);
        if(result.error){
            return res.status(500).json({
                message:result.message
            })
        }
        console.log(result);
        await postModel.create({
            imageUrl:result.url,
            caption:caption
        })
        return res.status(201).json({
            message:"Post created successfully",
        })
      
    }catch(err){
      res.status(500).json({
        message:err.message,
      })
    }
})


app.get("/getPosts",async(req,res)=>{
    try{
    const result = await postModel.find().sort({createdAt:-1});
    if(!result){
        return res.status(404).json({
            message:"No posts found"
        })
    }
    return res.status(200).json({
        message:"Posts fetched successfully",
        data:result
    })
    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
})






module.exports = app;