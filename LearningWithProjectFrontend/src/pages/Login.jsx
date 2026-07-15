import React, { useState } from "react";
import { ToastContainer, Bounce, toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { base_url } from "../utils/constants";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        base_url+"/login",
        {
          emailId: email,
          password: password,
        },
        {
          withCredentials: true,
        },
      );
      console.log(response.data);
      setEmail("");
      setPassword("");

      if (response.data.message === "login successful") {
        toast.success("😍Login succesfull!😍", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
      navigate("/");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(`❌${err.response.data.message}❌`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    }
  };

  return (
    <div className="flex justify-center my-16">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-80 h-96 flex flex-col  border p-4">
        <h1 className="text-2xl font-bold text-center mb-4 underline">Login</h1>
        <label className="label mt-5 font-semibold text-lg ">Email :</label>
        <input
          type="email"
          className="input font-semibold outline-none text-lg"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <label className="label mt-2 font-semibold text-lg">Password :</label>
        <input
          type="password"
          className="input font-semibold outline-none text-lg"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <button
          className="btn btn-neutral mt-4 font-bold text-xl rounded-box"
          onClick={handleLogin}
        >
          Login
        </button>
      </fieldset>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
};

export default Login;
