import React from 'react'
import Button from '../components/Button'
import InputAndLable from '../components/InputAndLable'
import validator from 'validator'
import { baseUrl } from '../../../utils/constants'
import axios from 'axios'
import { Link } from 'react-router'

const Login = () => {
const [formData, setFormData] = React.useState({
    email: "",
    password: ""
  })
  const handleSubmit= async(e)=>{
    e.preventDefault()
    console.log("clicked")
    console.log(formData)
    if(!formData.email || !formData.password){
      alert("Please fill all the fields")
      return
    }
    if(formData.password.length<8||!validator.isStrongPassword(formData.password)){
      alert("Password must be at least 8 characters long")
      return
    }
    if(!validator.isEmail(formData.email)){
      alert("Please enter a valid email")
      return
    }
    try{
  const response = await axios.post(`${baseUrl}/auth/login`,{
    email:formData.email.toLowerCase(),
    password:formData.password
  },
{withCredentials:true})

console.log(response?.data?.message)
    }catch(err){
      console.log(err?.response?.data || err.message)
    }
    setFormData({
      email: "",
      password: ""
    })
  }
  return (
    <main className='flex justify-center  items-center h-screen w-full bg-[#1e1d1d]'>
      <form onSubmit={handleSubmit} className='h-[70%] w-[30%] px-4 py-8'>
        <h1 className='text-white text-4xl font-bold'>Login</h1>
        <InputAndLable label="Email :" type="email" placeholder="Enter Your Email" name="email" setFormData={setFormData} formData={formData} />
        <InputAndLable label="Password :" type="password" placeholder="Enter Password" name="password" setFormData={setFormData} formData={formData} />
             <div className="mt-6">
      <button
        className="w-full text-center bg-pink-700 text-white font-bold py-2 cursor-pointer active:scale-90 transition-all duration-150 ease-in rounded-3xl text-2xl"
        type="submit"
      >
       Login
      </button>
      </div>
      <div className='mt-4 text-center text-white'>
              <h3 className='text-xl'>Don't have an account ? <Link className='text-pink-700 cursor-pointer font-bold hover:underline ' to="/register">Register</Link></h3>
            </div>
      </form>

    </main>
  )
}

export default Login