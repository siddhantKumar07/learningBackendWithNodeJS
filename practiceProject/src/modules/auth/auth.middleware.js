import apiError from "../../common/utils/api-error";
import UserModel from "./auth.model.js";

const authenticate = async(req,res,next)=>{
 
        try{
            // step 1: get the token from the request header
            const token;
            if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
                token = req.headers.authorization.split(" ")[1];
            }
            if(!token){
                throw apiError.unAuthorized("Unauthorized");
            }
            // step 2: verify the token
            const user = await UserModel.findOne({ token });
            if(!user){
                throw apiError.unAuthorized("Unauthorized");
            }

        }catch(error){
            throw apiError.unAuthorized("Unauthorized");
        }

}