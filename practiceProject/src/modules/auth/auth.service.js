import UserModel from "./auth.model.js";
import ApiError from "../../common/utils/api-error.js";
import { generateResetToken } from "../../common/utils/jwt-token.js";

const registerService = async ({name, email, password,role})=>{
    // checking whether the user is already registerred
    const isAlreadyRegistered = await UserModel.findOne({email});
    
    if(isAlreadyRegistered){
       throw ApiError.conflict("User with this email is already registered");
    //    return res.status(400).json({message:"User with this email is already registered"});
    }

    const {rawToken, hashedToken} = generateResetToken();

    const user = new UserModel({
        name,
        email,
        password,
        role,
        verificationToken:hashedToken // token
    })
   await user.save();
    return user;
}

// hashing through crypto 
const hashToken = (token)=>  crypto.createHash("sha256").update(token).digest("hex");
const loginService = async({email,password})=>{
    try{
        // step 1: check whether the user is registered or not
        const user = await UserModel.findOne({email}).select("+password");
        // step 2: if user is not registered then throw error
        if(!user){
            throw ApiError.notFound("User with this email is not registered");
        }
        // step 3: if user is registered then check whether the password is correct or not
        const isPasswordCorrect = await user.comparePassword(password);
        if(!isPasswordCorrect){
            throw ApiError.passwordMismatch("Password is incorrect");
        }
        if(!user.isVerified){
            throw ApiError.forbidden("User is not verified");
        }
        const accessToken = generateAccessToken({id:user._id,role:user.role});
        const refreshToken = generateRefreshToken({id:user._id});

    }catch(error){
        throw error;
    }
}

export {
    registerService
}