const validator = require("validator");

const checkChanges=(data)=>{
  const allowedUpdates=[
      "photoUrl","skills","about","age","gender"
    ]
    const isAllowedUpdates = Object.keys(data).every((k)=>allowedUpdates.includes(k));// it will return true if evry keys are available in allowedUpdates

    if(!isAllowedUpdates){
      throw new Error("Updates are not allowed for some field")
    }
}
const validatePassword = (newPassword)=>{
  if(!validator.isStrongPassword(newPassword)){
    throw new Error("password is not strong enough")
  }
  else{
    return true;
  }
}
module.exports={
    checkChanges,
    validatePassword
}