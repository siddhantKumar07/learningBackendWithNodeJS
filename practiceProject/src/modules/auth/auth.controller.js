import authModel from "./auth.model"
import {logoutService, registerService} from "./auth.service.js"
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

    // req.headers.authorization =`Bearer ${accessToken}`

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
export {
    registerController,
    loginController,
    logoutController,
    getMeController
}