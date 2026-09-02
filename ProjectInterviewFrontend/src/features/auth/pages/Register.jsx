import React from 'react'
import InputAndLable from '../components/InputAndLable'
import validator from 'validator'
import { RegisterApi } from '../services/auth.api'
import { Link } from 'react-router'
const Register = () => {
  const [formData, setFormData] = React.useState({
    username: "",
    email: "",
    password: ""
  })
  const handleSubmit =async (e)=>{
    e.preventDefault()
    if(!formData.username || !formData.email || !formData.password){
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
    if(formData.username.length<3||formData.username.length>20){
      alert("Username must be at least 3 characters long and not more than 20 characters")
      return
    }
   const response =await  RegisterApi({
      username:formData.username.toLowerCase(),
      email:formData.email.toLowerCase(),
      password:formData.password
    })
    
    console.log(response)

    console.log("clicked")
    console.log(formData)
    setFormData({
      username: "",
      email: "",
      password: ""
    })
  }
  return (
     <main className='flex justify-center  items-center h-screen w-full bg-[#1e1d1d]'>
      <form onSubmit={handleSubmit} className='h-[70%] w-[30%] px-4 py-8'>
        <h1 className='text-white text-4xl font-bold'>Register</h1>
        <InputAndLable setFormData={setFormData} formData={formData} label="UserName :" type="text" name="username" placeholder="Enter Your username" />
        <InputAndLable setFormData={setFormData} formData={formData} label="Email :" type="email" name="email" placeholder="Enter Your Email" />
        <InputAndLable setFormData={setFormData} formData={formData} label="Password :" type="password" name="password" placeholder="Enter Password" />
      <div className="mt-6">
      <button
        className="w-full text-center bg-pink-700 text-white font-bold py-2 cursor-pointer active:scale-90 transition-all duration-150 ease-in rounded-3xl text-2xl"
        type="submit"
      >
       Register
      </button>
      </div>
      <div className='mt-4 text-center text-white'>
        <h3 className='text-xl'>Already have an account ? <Link className='text-pink-700 cursor-pointer font-bold hover:underline ' to="/login">Login</Link></h3>
      </div>
      </form>
       
    </main>
  )
}

export default Register