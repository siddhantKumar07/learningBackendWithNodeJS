const transactionModel = require("../model/transaction.model");
const accountModel = require("../model/account.model");
const mongooes = require("mongoose");
const ledgerModel = require("../model/ledger.model");
const { sendTransactonEmail } = require("../service/email.service");

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
    if(isTransactionAlreadyExist.status === "reversed"){
        return res.status(400).json({
            success:false,
            message:"transaction already reversed, please try again"
        })
    }

    // checking account status whether it is active or not 
    if(fromAccountUser.status !== "active" || toAccountUser.status !== "active"){
        return res.status(400).json({
            success:false,
            message:"fromAccount or toAccount is not active"
        })
    }

    const balance = fromAccountUser.getBalance()

    if(balance < amount){
        return res.status(400).json({
            success:false,
            message:`insufficient balance in fromAccount. Current balance is ${balance},required amount is ${amount}`
        })
    }

    const session = await mongooes.startSession();
    session.startTransaction();

       const newTransaction = await transactionModel.create({
        fromAccount:fromAccount,
        toAccount:toAccount,
        amount:amount,
        idempotencyKey:idempotencyKey,
        status:"pending"
       },{session:session})

       const debitLedgerEntry = await ledgerModel.create({
        account:fromAccount,
        type:"debit",
        amount:amount,
        transaction:newTransaction._id
       },{session:session})

       const creditLedgerEntry = await ledgerModel.create({
        account:toAccount,
        type:"credit",
        amount:amount,
        transaction:newTransaction._id
       },{session:session})
  newTransaction.status = "success"
  await newTransaction.save({session:session})

  await session.commitTransaction();
  session.endSession();

  // sending email notification
 await sendTransactonEmail(
    req.user.email,
    req.user.name,
    amount,
    toAccountUser._id,
  )
      
  return res.status(201).json({
    success: true,
    message: "transaction processed successfully",
    transaction: newTransaction,
  });

  }
}
const createInitialFundsTransactionController = async(req,res)=>{
    const {toAccount,amount,idempotencyKey} = req.body;
    if(!toAccount || !amount || !idempotencyKey){

    return res.status(400).json({
        success:false,
        message:"Please provide toAccount,amount and idempotencyKey"
    })}
   
    const toAccountUser = await accountModel.findOne({_id:toAccount})
     if(!toAccountUser){
        return res.status(400).json({
            success:false,
            message:"toAccount is invalid"
        })
     }
}

module.exports=createTransaction