import apiError from "../../common/utils/api-error";
import { verifyAccessToken } from "../../common/utils/jwt-token.js";
import UserModel from "./auth.model.js";

const authenticate = async(req,res,next)=>{
 
        try{
            // step 1: get the token from the request header
            let token;
            if(req.headers.authorization && req.headers.authorization.startsWith("Bearer ")){
                token = req.headers.authorization.split(" ")[1];
            }
            if(!token){
                token = req.cookies.accessToken;
            }
            if(!token){
                throw apiError.unAuthorized("No token provided");
            }
            // step 2: verify the token
            const decoded = verifyAccessToken(token);

            const user = await UserModel.findById(decoded.id);

            if(!user){
                throw apiError.unAuthorized("user not found");
            }
            req.user = user;
            
            next();

        }catch(error){
            next(error);
        }

}

const authorize = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            throw apiError.forbidden("you are not authorized to access this resource");
        }
        next();
    }
}
export{
    authenticate,
    authorize
}