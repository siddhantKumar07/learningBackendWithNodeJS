const transactionModel = require("../model/transaction.model");
const accountModel = require("../model/account.model");
const createTransaction = async (req, res) => {
  const { fromAccount, toAccount, amount, idempotencyKey } = req.body;
  if (!fromAccount || !toAccount || !amount || !idempotencyKey) {
    return res.status(400).json({
      success: false,
      message: "Please provide fromAccount,toAccount,amount and idempotencyKey",
    });
  }
  const fromAccountUser = await accountModel.findOne({
    _id: fromAccount,
  });
  const toAccountUser = await accountModel.findOne({
    _id: toAccount,
  });
  if (!fromAccountUser || !toAccountUser) {
    return res.status(400).json({
      success: false,
      message: "fromAccount or toAccount is invalid",
    });
  }
  const isTransactionAlreadyExist = await transactionModel.findOne({
    idempotencyKey: idempotencyKey,
  });
  if (isTransactionAlreadyExist) {
    if (isTransactionAlreadyExist.status === "success") {
      return res.status(200).json({
        success: true,
        message: "transaction already processed",
        transaction: isTransactionAlreadyExist,
      });
    }
    if (isTransactionAlreadyExist.status === "pending") {
      return res.status(200).json({
        success: true,
        message: "transaction is already in progress",
        transaction: isTransactionAlreadyExist,
      });
    }
    if (isTransactionAlreadyExist.status === "failed") {
      return res.status(400).json({
        success: false,
        message: "transaction failed previously, please try again",
      });
    }
    
  }
};
