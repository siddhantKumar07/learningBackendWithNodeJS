import authModel from "./auth.model"
import {registerService} from "./auth.service.js"
import { loginService } from "./auth.service.js"
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
    res.cookie("accessToken",accessToken)
    res.cookie("refreshToken",refreshToken)

    req.headers.authorization =`Bearer ${accessToken}`
    
    return res.status(200).json({
        success:true,
        message:"User logged in successfully",
        data:user
    })
    


}

export {
    registerController,
    loginController
}