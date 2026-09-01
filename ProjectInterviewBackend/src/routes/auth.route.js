const express = require('express');
const {registerMiddleware, authMiddleware} = require("../middleware/authMiddleware");
const {registerController, loginController, logoutController, profileController} = require("../controllers/authController")
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

authRouter.post("/login", loginMiddleware,loginController);

/**
 * @route POST /api/auth/logout
 * @desc Logout a user
 * @access Public
 */

authRouter.get("/logout",logoutController);

/**
* @route GET /api/auth/profile
* @desc Get the profile of the logged in user
* @access Private
 */
authRouter.get("/profile",authMiddleware,profileController)

module.exports = authRouter;