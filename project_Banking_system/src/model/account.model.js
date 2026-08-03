
const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:[true,"account must belong to a user"]
    },
    status:{
        type:String,
        enum:{
           values: ["active","frozen","closed"],
            default:"active",
            message:"status can only be active,frozen or closed"  
        }
    },
    currency:{
        type:String,
        required:[true,"currency is required"],
        default:"INR"
    }

},{
    timestamps:true 
})

const accountModel = mongoose.model("account",accountSchema);
module.exports = accountModel;