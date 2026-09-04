import React from 'react'
import InputAndLable from '../components/InputAndLable'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { loginValidation } from '../validation/authValidation'
const Login = () => {
  const navigate = useNavigate()
  const{loading,handleLogin} = useAuth()
const [formData, setFormData] = React.useState({
    email: "",
    password: ""
  })
  const handleSubmit= async(e)=>{
    e.preventDefault()
   if(!loginValidation(formData)) return

   await handleLogin({
    email:formData.email.toLowerCase(),
    password:formData.password
   })
 navigate("/")
    setFormData({
      email: "",
      password: ""
    })
  }
  if(loading){
    return (
      <div className='flex justify-center items-center h-screen w-full bg-[#1e1d1d]'>
        <h1 className='text-white text-4xl font-bold'>Loading...</h1>
      </div>
    )
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