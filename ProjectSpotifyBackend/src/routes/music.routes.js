const express = require('express');
const {createMusicMiddleware} = require('../middlewares/musicMiddleware');
const {CreateMusicController} = require('../controllers/musicController');
const {createAlbumMiddleware} = require('../middlewares/musicMiddleware');
const {CreateAlbumController} = require('../controllers/musicController');
const multer = require("multer");
const musicRouter = express.Router();

const upload = multer({
    storage:multer.memoryStorage(),
    limits: 5 * 1024 * 1024 // 5MB
})
//api = /api/music
musicRouter.post("/createMusic", upload.single("musicFile"), createMusicMiddleware, CreateMusicController);

musicRouter.post("/createAlbum/:musicId/:title",createAlbumMiddleware,CreateAlbumController);
module.exports = musicRouter;