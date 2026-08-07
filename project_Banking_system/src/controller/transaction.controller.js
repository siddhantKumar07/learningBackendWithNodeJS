
const createTransaction=async(req,res)=>{
    const {fromAccount,toAccount,amount,idempotencyKey} = req.body;
    if(!fromAccount || !toAccount || !amount || !idempotencyKey){
        return res.status(400).json({
            success:false,
            message:"Please provide fromAccount,toAccount,amount and idempotencyKey"
        })
    }
}