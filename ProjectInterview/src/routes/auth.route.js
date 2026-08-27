const express = require('express');
const {registerMiddleware} = require("../middleware/authMiddleware");
const authRouter = express.Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
authRouter.post("/register", registerMiddleware);




module.exports = authRouter;