const express = require("express");
const {registerAuthMiddleware} = require("../middlewares/authMiddleware");
const {registerAuthController }= require("../controllers/authController");
const {loginAuthMiddleware} = require("../middlewares/authMiddleware");
const {loginAuthController} = require("../controllers/authController");
const authRouter = express.Router();

//post request for register user api = api/auth/register
authRouter.post("/register", registerAuthMiddleware,registerAuthController);

authRouter.post("/login", loginAuthMiddleware,loginAuthController);
module.exports = authRouter;