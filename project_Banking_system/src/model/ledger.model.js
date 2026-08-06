const mongoose = require("mongoose");

const ledgerSchema = new mongoose.Schema({
    account:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"ledger must have an account"],
        ref:"Account",
        index:true,
        immutable:true
    },
    amount:{
        type:Number,
        required:[true,"ledger must have an amount"],
        min:[1,"ledger amount must be greater than 0"],
        immutable:true
    },
    transaction:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Transaction",
        required:[true,"ledger must have a transaction"],
        index:true,
        immutable:true
    },
    type:{
        type:String,
        enum:{
            values:["credit","debit"],
                message:"ledger type must be either credit or debit"
        },
        required:[true,"ledger must have a type"],
        immutable:true
    }
})

const preventLedgerModification = function(){
    throw new Error("ledger cannot be modified")
}
ledgerSchema.pre("findOneAndUpdate",preventLedgerModification)
ledgerSchema.pre("updateOne",preventLedgerModification)
ledgerSchema.pre("updateMany",preventLedgerModification)
ledgerSchema.pre("update",preventLedgerModification)
ledgerSchema.pre("deleteOne",preventLedgerModification)
ledgerSchema.pre("deleteMany",preventLedgerModification)

const ledgerModel =mongoose.model("Ledger",ledgerSchema)
module.exports = ledgerModel;