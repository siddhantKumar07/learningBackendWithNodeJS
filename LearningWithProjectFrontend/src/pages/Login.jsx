import React, { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState()
    
    const handleLogin = async() => {
        console.log(email + ' ' + password )
  const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ emailId:email, password:password })
        })
        const data = await response.json()
        console.log(data)
        setEmail('')
        setPassword('')
    }

  return (
    <div className="flex justify-center my-16">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-80 h-96 flex flex-col  border p-4">
        <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
        <label className="label mt-5 font-semibold text-lg ">Email :</label>
        <input
          type="email"
          className="input font-semibold outline-none text-lg"
          placeholder="Email"
          value={email}
          onChange={(e)=>{
            setEmail(e.target.value)
          }}
        />

        <label className="label mt-2 font-semibold text-lg">Password :</label>
        <input
          type="password"
          className="input font-semibold outline-none text-lg"
          placeholder="Password"
          value={password}
          onChange={(e)=>{
            setPassword(e.target.value)
          }}
        />

        <button className="btn btn-neutral mt-4 font-bold text-xl rounded-box"
        onClick={handleLogin}
        >
          Login
        </button>
      </fieldset>
    </div>
  );
};

export default Login;
