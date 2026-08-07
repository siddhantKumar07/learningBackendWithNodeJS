const express = require("express");
const { authMiddleware, authSystemUserMiddleware } = require("../middleware/auth.middleware");
const createTransaction = require("../controller/transaction.controller");

const transactionRouter = express.Router();
/**
 * @route POST request to /api/transaction
 * @desc create a new transaction for the authenticated user
 */
transactionRouter.post("/",authMiddleware,createTransaction)

/**
 * @route POST request to /api/system/initial-funds
 * @desc create a intial fund transaction from system user 
 */
transactionRouter.post("/system/intial-funds",authMiddleware,authSystemUserMiddleware)

module.exports = transactionRouter;