const express = require("express");
const { authMiddleware } = require("../middleware/auth.middleware");
const createTransaction = require("../controller/transaction.controller");

const transactionRouter = express.Router();
/**
 * @route POST request to /api/transaction
 * @desc create a new transaction for the authenticated user
 */
transactionRouter.post("/",authMiddleware,createTransaction)


module.exports = transactionRouter;