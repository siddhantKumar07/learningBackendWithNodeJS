import UserModel from "./auth.model.js";
import apiError from "../../common/utils/api-error.js";
import { generateAccessToken, generateRefreshToken, generateResetToken, verifyRefreshToken } from "../../common/utils/jwt-token.js";
import { sendVerificationEmail,sendResetPasswordEmail} from "../../common/config/email.js";

const registerService = async ({name, email, password,role})=>{
    // checking whether the user is already registerred
    const isAlreadyRegistered = await UserModel.findOne({email});
    if(isAlreadyRegistered){
       throw apiError.conflict("User with this email is already registered");
    //    return res.status(400).json({message:"User with this email is already registered"});
    }

    const {rawToken, hashedToken} = generateResetToken();

    try{

    await sendVerificationEmail({ to: email, token: rawToken });

    }catch(error){
        console.log(error);
    }
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
            throw apiError.passwordMismatch("email or password is incorrect");
        }
        if(!user.isVerified){
            throw apiError.forbidden("User is not verified first verify your account then login");
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
    sendResetPasswordEmail({to:email, token:rawToken});

    // step 4: return the raw token
    // return rawToken;
}

const resetPasswordService = async(resetToken, newPassword)=>{
// step 1: hash the reset token
const hashedToken = hashToken(resetToken);

// step 2: find the user with the hashed reset token and check if the token is not expired
const user = await UserModel.findOne({
    resetPasswordToken:hashedToken,
    resetPasswordExpires:{$gt:Date.now()}
});
if(!user) throw apiError.notFound("Invalid or expired reset token");

// step 3: update the user's password and clear the reset token fields
user.password = newPassword;
user.resetPasswordToken = undefined;
user.resetPasswordExpires = undefined;

// step 4: save the updated user   and also it will hash the password before saving it to the database because of the pre save hook in the user model 
await user.save();

// step 5: return the updated user
// return user;

}

// verify email service
const verifyEmailService = async(token)=>{
    const hashedToken = hashToken(token);
    const user = await UserModel.findOne({verificationToken:hashedToken}).select("+verificationToken");
    if(!user) throw apiError.notFound("Invalid or expired verification token");
    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save({validateBeforeSave:false});
    return;
}

export {
    registerService,
    loginService,
    forgotPasswordService,
    resetPasswordService,
    refresh,
    logoutService,
    verifyEmailService
}