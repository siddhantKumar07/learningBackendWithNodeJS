import React from 'react'
import Button from '../components/Button'
import InputAndLable from '../components/InputAndLable'

const Login = () => {
  return (
    <main className='flex justify-center  items-center h-screen w-full bg-[#1e1d1d]'>
      <form className='h-[70%] w-[30%] px-4 py-8'>
        <h1 className='text-white text-4xl font-bold'>Login</h1>
        <InputAndLable label="Email :" type="email" placeholder="Enter Your Email" />
        <InputAndLable label="Password :" type="password" placeholder="Enter Password" />
             <div className="mt-6">
      <button
        className="w-full text-center bg-pink-700 text-white font-bold py-2 cursor-pointer active:scale-90 transition-all duration-150 ease-in rounded-3xl text-2xl"
        type="submit"
      >
       Login
      </button>
      </div>
      </form>

    </main>
  )
}

export default Login