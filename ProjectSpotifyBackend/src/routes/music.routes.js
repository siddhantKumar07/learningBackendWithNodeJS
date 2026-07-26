const express = require('express');
const createMusicMiddleware = require('../middlewares/musicMiddleware');
const musicRouter = express.Router();

//api = /api/music
musicRouter.post("/createMusic", createMusicMiddleware, (req,res)=>{
    res.status(200).json({
        message:"Music created successfully"
        g
    })
})


module.exports = musicRouter;