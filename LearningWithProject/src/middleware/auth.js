const adminAuth=(req,res,next)=>{
    const token = "admin";
    const isAuthorized =token==="admin";
    if(!isAuthorized){
        res.status(401).json({
            message:"unauthorized access"
        })
    }
    else{
        next();
    }
}
const userAuth=(req,res,next)=>{
    const token = "user";
    const isAuthorized =token==="user";
    if(!isAuthorized){
        res.status(401).json({
            message:"unauthorized access"
        })
    }
    else{
        next();
    }
}
module.exports={
    adminAuth,
    userAuth
}