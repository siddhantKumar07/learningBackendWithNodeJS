import UserModel from "./auth.model.js";
import apiError from "../../common/utils/api-error.js";
import { generateAccessToken, generateRefreshToken, generateResetToken, verifyRefreshToken } from "../../common/utils/jwt-token.js";

const registerService = async ({name, email, password,role})=>{
    // checking whether the user is already registerred
    const isAlreadyRegistered = await UserModel.findOne({email});
    
    if(isAlreadyRegistered){
       throw apiError.conflict("User with this email is already registered");
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
            throw apiError.notFound("User with this email is not registered");
        }
        // step 3: if user is registered then check whether the password is correct or not
        const isPasswordCorrect = await user.comparePassword(password);
        if(!isPasswordCorrect){
            throw apiError.passwordMismatch("Password is incorrect");
        }
        if(!user.isVerified){
            throw apiError.forbidden("User is not verified");
        }
        const accessToken = generateAccessToken({id:user._id,role:user.role});
        const refreshToken = generateRefreshToken({id:user._id});

        user.refreshToken = hashToken(refreshToken);
        await user.save({validateBeforeSave:false});

        delete user.password;
        delete user.refreshToken;
        return {user,accessToken,refreshToken};

    }catch(error){
        throw error;
    }
}

// refreshing the access token using the refresh token
const refresh = async(refreshToken)=>{
    // step 1: check whether the refresh token is provided or not
    if(!refreshToken) throw apiError.unAuthorized("Refresh token is required");
    // step 2: verify the refresh token
    const decoded = verifyRefreshToken(refreshToken);
    if(!decoded) throw apiError.unAuthorized("Invalid refresh token");
   // step 3: check whether the user is registered or not
    const user = await UserModel.findOne({_id:decoded.id}).select("+refreshToken");
    if(!user) throw apiError.notFound("User not found");
    if(!user.refreshToken) throw apiError.forbidden("user is not logged in");
    
    // step 4: check whether the refresh token is valid
    if(user.refreshToken !== hashToken(refreshToken)) throw apiError.unAuthorized("Refresh token is not valid");
    
    // step 5: generate a new access token
    const accessToken = generateAccessToken({id:user._id,role:user.role});

    //step 6 : generate a new refresh token
    const newRefreshToken = generateRefreshToken({id:user._id});
    user.refreshToken = hashToken(newRefreshToken);
    await user.save({validateBeforeSave:false});

    // step 7: return the new access token and refresh token
    return accessToken;
}

// logout service
const logoutService = async(userId)=>{
    await UserModel.findByIdAndUpdate(userId,{refreshToken:null})
}

// forgot password service
const forgotPasswordService = async(email)=>{
    // step 1: check whether the user is registered or not
    const user = await UserModel.findOne({email});
    if(!user) throw apiError.notFound("User with this email is not registered");

    // step 2: generate a reset token
    const {rawToken, hashedToken} = generateResetToken();
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000;

    await user.save({validateBeforeSave:false});

    // step 3: send the reset token to the user's email
    // (You would implement the email sending logic here)


    // step 4: return the raw token
    return rawToken;
}
export {
    registerService,
    loginService
}