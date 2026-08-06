const mongoose = require("mongoose")
const transactionSchema = new mongoose.Schema({
    fromAccount:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Account",
        required:[true,"transaction must have a from account"]
        index:true
    },
    toAccount:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Account",
        required:[true,"transaction must have a to account"],
        index:true
    }
})
const transactionModel = mongoose.model("Transaction",transactionSchema)
module.exports = transactionModel