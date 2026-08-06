const mongoose = require("mongoose")
const transactionSchema = new mongoose.Schema({
    fromAccount:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Account",
        required:[true,"transaction must have a from account"],
        index:true
    },
    toAccount:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Account",
        required:[true,"transaction must have a to account"],
        index:true
    },
    status:{
        type:String,
        enum:{
            values:["pending","success","failed","reversed"],
            message:"status must be either pending,success,failed or reversed"
        },
        required:[true,"transaction must have a status"],
        default:"pending"
    },
    amount:{
        type:Number,
        required:[true,"transaction must have an amount to process"],
        min:[1,"transaction amount must be greater than 0"] 
    },
    idempotencyKey:{
     type:String,
     required:[true,"transaction must have an idempotency key"],
     unique:true,
     index:true
    }
},
{
    timestamps:true
})
const transactionModel = mongoose.model("Transaction",transactionSchema)
module.exports = transactionModel