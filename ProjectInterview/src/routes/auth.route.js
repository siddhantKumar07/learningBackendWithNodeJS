const express = require('express');
const {registerMiddleware} = require("../middleware/authMiddleware");
const {registerController} = require("../controllers/authController")
const authRouter = express.Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
authRouter.post("/register", registerMiddleware, registerController);




module.exports = authRouter;