import authModel from "./auth.model"
import {registerService} from "./auth.service.js"
const registerController = async ()=>{

const {value } = req.body

const user = await registerService(value)

return res.status(201).json({
    success:true,
    message:"User registered successfully",
    data:user
})

}

const loginController = async()=>{
    
}

export {
    registerController
}