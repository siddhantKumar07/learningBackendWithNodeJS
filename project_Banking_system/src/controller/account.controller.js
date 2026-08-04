const accountModel = require("../model/account.model");

const createAccount = async (req,res)=>{
    const userId = req.user._id;
    try{
        const newAccount = new accountModel({
            
            user:userId
        })
        await newAccount.save();
        return res.status(201).json({
            success:true,
            message:"account created successfully",
            account:newAccount
        })  
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message || "Internal server error"
        })
    }
}