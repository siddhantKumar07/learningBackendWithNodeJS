import userModel from "./auth.model.js";

const registerService = async ({name, email, password,role})=>{
    // checking whether the user is already registerred
    const isAlreadyRegistered = await userModel.findOne({email});

    if(isAlreadyRegistered){
       return res.status(400).json({message:"User with this email is already registered"});
    }
}