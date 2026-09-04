import validator from 'validator'
export const loginValidation = (formData) => {

 if(!formData.email || !formData.password){
      alert("Please fill all the fields")
      return false
    }
    if(formData.password.length<8||!validator.isStrongPassword(formData.password)){
      alert("Password must be at least 8 characters long")
      return false
    }
    if(!validator.isEmail(formData.email)){
      alert("Please enter a valid email")
      return false
    }
    return true
}

export const registerValidation = (formData) => {
 if(!formData.username || !formData.email || !formData.password){
      alert("Please fill all the fields")
      return false 
    }
    if(!validator.isEmail(formData.email)){
      alert("Please enter a valid email")
      return false
    }
    if(formData.password.length<8||!validator.isStrongPassword(formData.password)){
      alert("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one symbol")
      return false
    }
    if(formData.username.length<3||formData.username.length>20){
      alert("Username must be at least 3 characters long and not more than 20 characters")
      return false
    }
  return true


}