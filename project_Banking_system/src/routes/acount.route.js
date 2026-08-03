const express = require("express");
const { authMiddleware } = require("../middleware/auth.middleware");

const accountRouter = express.Router();

accountRouter.post("/",authMiddleware)

module.exports = accountRouter;