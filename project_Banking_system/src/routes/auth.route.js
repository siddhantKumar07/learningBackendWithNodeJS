const express = require("express");
const {registerMiddleware} = require("../middleware/auth.middleware")
const {registerController} = require('../controller/auth.controller')
const {loginMiddleware} = require("../middleware/auth.middleware")
const {loginController} = require("../controller/auth.controller")
const authRouter = express.Router();

/**
 * @route POST /api/auth/register
 * @desc user registration route
 */
authRouter.post("/register",registerMiddleware,registerController)

/**
 * @route POST request to /api/auth/login
 * @desc user login route
 */
authRouter.post("/login",loginMiddleware,loginController)



module.exports = authRouter;
