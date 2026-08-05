const express = require("express");
const { authMiddleware } = require("../middleware/auth.middleware");
const { createAccount } = require("../controller/account.controller");

const accountRouter = express.Router();

// @route POST request to /api/account
// @desc create a new account for the authenticated user 
accountRouter.post("/createAccount",authMiddleware,createAccount)

module.exports = accountRouter;