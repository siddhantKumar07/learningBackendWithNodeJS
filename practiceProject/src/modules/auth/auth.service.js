import userModel from "./auth.model.js";
import ApiError from "../../common/utils/api-error.js";
import { generateResetToken } from "../../common/utils/jwt-token.js";
const registerService = async ({name, email, password,role})=>{
    // checking whether the user is already registerred
    const isAlreadyRegistered = await userModel.findOne({email});
    
    if(isAlreadyRegistered){
       throw ApiError.conflict("User with this email is already registered");
    //    return res.status(400).json({message:"User with this email is already registered"});
    }

    const {rawToken, hashedToken} = generateResetToken();

    const user = new userModel({
        name,
        email,
        password,
        role,
        verificationToken:hashedToken
    })
   await user.save();
    return user;
}

export {
    registerService
}