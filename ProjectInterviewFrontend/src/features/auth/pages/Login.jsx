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
        <Button name="Login" />
      </form>

    </main>
  )
}

export default Login