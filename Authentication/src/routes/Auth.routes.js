const express = require("express");

const { register } = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");
const authRouter = express.Router();

authRouter.post("/register", authMiddleware, register);





module.exports = authRouter;