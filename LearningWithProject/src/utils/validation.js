const validator = require("validator");

const checkChanges=(data)=>{
  const notAllowed=[
      "emailId","password","firstName","lastName"
    ]
    const isNotAllowedUpdate = Object.keys(data).some((k)=>notAllowed.includes(k));

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