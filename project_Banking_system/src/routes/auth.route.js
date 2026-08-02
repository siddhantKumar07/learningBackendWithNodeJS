const express = require("express");
const {registerMiddleware} = require("../middleware/auth.middleware")
const {registerController} = require('../controller/auth.controller')
const authRouter = express.Router();

authRouter.post("/register",registerMiddleware,registerController)
authRouter.post("/login",)



module.exports = authRouter;
