import authModel from "./auth.model"
import {forgotPasswordService, logoutService, registerService, resetPasswordService, verifyEmailService} from "./auth.service.js"
import { loginService } from "./auth.service.js"
import { getMeService } from "./auth.service.js"
const registerController = async (req,res)=>{

const {value } = req.body

const user = await registerService(value)

return res.status(201).json({
    success:true,
    message:"User registered successfully",
    data:user
})

}

const loginController = async(req,res)=>{
    const {value} = req.body;

    const {user,accessToken,refreshToken} = await loginService(value)
    res.cookie("accessToken",accessToken,{ httpOnly:true, maxAge:15*60*1000}) // 
    res.cookie("refreshToken",refreshToken,{ httpOnly:true, maxAge:7*24*60*60*1000})

    res.setHeader("Authorization", `Bearer ${accessToken}`);

    return res.status(200).json({
        success:true,
        message:"User logged in successfully",
        data:user
    })
    


}
const logoutController = async(req,res)=>{
    const {user} = req;
    await logoutService(user._id)
    res.clearCookie("accessToken")
    res.clearCookie("refreshToken")
    return res.status(200).json({
        success:true,
        message:"User logged out successfully"
    })
}

const getMeController = async(req,res)=>{
const {user} = req;
return res.status(200).json({
    success:true,
    message:"User fetched successfully",
    data:user
});


}

const verifyEmailController = async(req,res)=>{
   const {token} = req.params;
     await verifyEmailService(token);
    return res.status(200).json({
        success:true,
        message:"Email verified successfully"
    })
}

// forgot password controller
const forgotPasswordController = async(req,res)=>{
    const {email} = req.params;
    await forgotPasswordService(email);
    return res.status(200).json({
        success:true,
        message:"Reset password link sent to your email"
    })
}

const resetPasswordController = async(req,res)=>{
     const {Token} = req.params;
    const {value} = req.body;
    await resetPasswordService(Token,value.password);
    return res.status(200).json({
        success:true,
        message:"Password reset successfully and you can now login with your new password"
    })

}

export {
    registerController,
    loginController,
    logoutController,
    getMeController,
    verifyEmailController,
    forgotPasswordController,
    resetPasswordController
}