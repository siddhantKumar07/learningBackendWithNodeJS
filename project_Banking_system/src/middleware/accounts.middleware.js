const accountModel = require("../model/account.model")
const accountsMiddleware = async(req, res, next) => {
const userId = req.user._id;

if (!userId) {
    return res.status(401).json({
        success: false,
        message: "Unauthorized access. User not authenticated."
    });
}
const isAccountExists =await accountModel.findOne({user:userId})
if(isAccountExists){
    return res.status(404).json({
        success:false,
        message:"you have already an account, you can only have one account"
    })}


next()
}
module.exports = accountsMiddleware