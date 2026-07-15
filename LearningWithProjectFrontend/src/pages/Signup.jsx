import axios from 'axios'
import React, { useState } from 'react'
import { base_url } from '../utils/constants'
import { Bounce, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
const Signup = () => {
  const navigate = useNavigate()
  const [data, setData] = useState({
     firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    age: "",
    gender: "",
    photoUrl: "",
    skills: "",
    about: "",
  })
  const handleChange=(e)=>{
    setData((prev)=>({
      ...prev,
      [e.target.name]:e.target.value
    }))
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
     const checkeddata ={
      ...data,
      skills: data.skills
        ? data.skills.split(",").map((s) => s.trim())
        : [],
     }

     console.log(checkeddata);
     try{
    const response = await axios.post(base_url+"/signUp",checkeddata,{
      withCredentials:true
     })
     console.log(response);
      toast.success("😍Account created succesfully!😍", {
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
    navigate("/login")

     }catch(err){
      toast.error(err.response?.data.message, {
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
return (
  <div className="min-h-screen text-black bg-gray-100 flex items-center justify-center p-6">
    <div className="bg-white w-full max-w-3xl rounded-3xl shadow-xl p-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Create Account
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-5">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium mb-2">
              First Name
            </label>
            <input
            onChange={handleChange}
            value={data.firstName}
              type="text"
              name="firstName"
              placeholder="Enter first name"
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Last Name
            </label>
            <input
            onChange={handleChange}
            value={data.lastName}
              type="text"
              name="lastName"
              placeholder="Enter last name"
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
            onChange={handleChange}
            value={data.emailId}
              type="email"
              name="emailId"
              placeholder="Enter email"
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Password
            </label>
            <input
            onChange={handleChange}
            value={data.password}
              type="password"
              name="password"
              placeholder="Enter password"
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Age
            </label>
            <input
            onChange={handleChange}
            value={data.age}
              type="number"
              name="age"
              placeholder="Enter age"
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Gender
            </label>
            <select
            onChange={handleChange}
              name="gender"
              value={data.gender}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Photo URL */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">
              Photo URL
            </label>
            <input
            onChange={handleChange}
            value={data.photoUrl}
              type="text"
              name="photoUrl"
              placeholder="https://example.com/profile.jpg"
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Skills */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">
              Skills
            </label>
            <input
            onChange={handleChange}
            value={data.skills}
              type="text"
              name="skills"
              placeholder="React, Node.js, MongoDB"
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Separate multiple skills using commas.
            </p>
          </div>

          {/* About */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">
              About
            </label>
            <textarea
              onChange={handleChange}
              value={data.about}
              name="about"
              rows="4"
              placeholder="Tell us something about yourself..."
              className="w-full border rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition"
        >
          Create Account
        </button>
      </form>
    </div>
  </div>
);
}

export default Signup