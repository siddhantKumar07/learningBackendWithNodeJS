const express = require("express");
const { authMiddleware } = require("../middleware/auth.middleware");

const accountRouter = express.Router();

// @route POST request to /api/account
// @desc create a new account for the authenticated user
accountRouter.post("/",authMiddleware)

module.exports = accountRouter;