const express = require('express');
const {registerMiddleware} = require("../middleware/authMiddleware");
const {registerController} = require("../controllers/authController")
const {loginMiddleware} = require("../middleware/authMiddleware");
const authRouter = express.Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
authRouter.post("/register", registerMiddleware, registerController);


/**
 * @route POST /api/auth/login
 * @desc Login a user
 * @access Public
 */

authRouter.post("/login", loginMiddleware)


module.exports = authRouter;