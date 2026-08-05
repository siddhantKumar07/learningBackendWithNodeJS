
const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:[true,"account must belong to a user"],
        index:true
    },
    status:{
        type:String,
        enum:{
           values: ["active","frozen","closed"],
            message:"status can only be active,frozen or closed"  
        },
        default:"active",

    },
    currency:{
        type:String,
        required:[true,"currency is required"],
        default:"INR"
    }

},{
    timestamps:true 
})
accountSchema.index({user:1,status:1})

const accountModel = mongoose.model("account",accountSchema);
module.exports = accountModel;