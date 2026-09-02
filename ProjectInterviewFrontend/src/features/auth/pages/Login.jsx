import React from 'react'

const Login = () => {
  return (
    <main className='flex justify-center items-center h-screen w-full bg-gray-100'>
      <form className='h-[70%] w-[60%]'>
        <h1>Login</h1>
        <div>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
        </div>
        <div>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        </div>
        <div>
          <button type='submit'>Login</button>
        </div>
      </form>

    </main>
  )
}

export default Login