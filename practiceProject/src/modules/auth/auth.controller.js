import authModel from "./auth.model"
const registerController = async ()=>{
const {data } = req.body
const user = await authModel.create(data)
}

const loginController = async()=>{
    
}

export {
    registerController
}