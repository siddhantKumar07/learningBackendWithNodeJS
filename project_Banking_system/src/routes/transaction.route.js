const express = require("express");
const { authMiddleware } = require("../middleware/auth.middleware");

const transactionRouter = express.Router();
/**
 * @route POST request to /api/transaction
 * @desc create a new transaction for the authenticated user
 */
transactionRouter.post("/",authMiddleware)


module.exports = transactionRouter;