const validator = require("validator");

const checkChanges=(data)=>{
  const notAllowed=[
      // "photoUrl","skills","about","age","gender"
      "emailId","password","firstName","lastName"
    ]
    const isNotAllowedUpdate = Object.keys(data).some((k)=>notAllowed.includes(k));// it will return true if evry keys are available in allowedUpdates

    if(isNotAllowedUpdate){
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