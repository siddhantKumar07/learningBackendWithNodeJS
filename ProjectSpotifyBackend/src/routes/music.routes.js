const express = require('express');
const createMusicMiddleware = require('../middlewares/musicMiddleware');
const createMusicMiddleware = require('../middlewares/musicMiddleware');
const musicRouter = express.Router();

//api = /api/music
musicRouter.post("/createMusic", createMusicMiddleware,CreateMusicController)


module.exports = musicRouter;