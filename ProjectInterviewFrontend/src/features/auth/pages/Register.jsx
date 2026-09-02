import React from 'react'
import Button from '../components/Button'
import InputAndLable from '../components/InputAndLable'
import validator from 'validator'
const Register = () => {
  const [formData, setFormData] = React.useState({
    userName: "",
    email: "",
    password: ""
  })
  const handleSubmit = (e)=>{
    e.preventDefault()
    if(!formData.userName || !formData.email || !formData.password){
      alert("Please fill all the fields")
      return
    }
    if(!validator.isEmail(formData.email)){
      alert("Please enter a valid email")
      return
    }
    if(formData.password.length<8||!validator.isStrongPassword(formData.password)){
      alert("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one symbol")
      return
    }
    if(formData.userName.length<3||formData.userName.length>20){
      alert("Username must be at least 3 characters long and not more than 20 characters")
      return
    }
    
    console.log("clicked")
    console.log(formData)
    setFormData({
      userName: "",
      email: "",
      password: ""
    })
  }
  return (
     <main className='flex justify-center  items-center h-screen w-full bg-[#1e1d1d]'>
      <form onSubmit={handleSubmit} className='h-[70%] w-[30%] px-4 py-8'>
        <h1 className='text-white text-4xl font-bold'>Register</h1>
        <InputAndLable setFormData={setFormData} label="UserName :" type="text" name="userName" placeholder="Enter Your username" />
        <InputAndLable setFormData={setFormData} label="Email :" type="email" name="email" placeholder="Enter Your Email" />
        <InputAndLable setFormData={setFormData} label="Password :" type="password" name="password" placeholder="Enter Password" />
      <div className="mt-6">
      <button
        className="w-full text-center bg-pink-700 text-white font-bold py-2 cursor-pointer active:scale-90 transition-all duration-150 ease-in rounded-3xl text-2xl"
        type="submit"
      >
       Register
      </button>
      </div>
      </form>

    </main>
  )
}

export default Register