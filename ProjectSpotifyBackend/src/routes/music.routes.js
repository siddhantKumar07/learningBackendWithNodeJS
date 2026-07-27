const express = require('express');
const createMusicMiddleware = require('../middlewares/musicMiddleware');
const CreateMusicController = require('../controllers/musicController');
const musicRouter = express.Router();

//api = /api/music
musicRouter.post("/createMusic", createMusicMiddleware,CreateMusicController)


module.exports = musicRouter;