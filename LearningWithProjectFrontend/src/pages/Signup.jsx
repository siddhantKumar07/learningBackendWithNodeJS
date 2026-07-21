import axios from 'axios'
import React, { useState } from 'react'
import { base_url } from '../utils/constants'
import { Bounce, toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
const Signup = () => {
  const navigate = useNavigate()
  const [data, setData] = useState({
  })
  const handleChange=(e)=>{
    const{name,value,type,files} = e.target;
    setData((prev)=>({
      ...prev,
      [name]:type=="file"?files[0]:value
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
     const formData = new FormData();
    for (const key in checkeddata) {
      formData.append(key, checkeddata[key]);
    }

     console.log(checkeddata);
     try{
    const response = await axios.post(base_url+"/signUp",formData,{
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
  <div className="h-screen text-black bg-gray-100 flex items-center justify-center p-4">
    <div className="bg-white w-full max-w-3xl rounded-3xl shadow-xl p-4">
      <h1 className="text-3xl font-bold text-center mb-2 underline text-gray-800">
        Create Account
      </h1>

      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="grid md:grid-cols-2 gap-3">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              First Name
            </label>
            <input
            onChange={handleChange}
            value={data.firstName}
            required
              type="text"
              name="firstName"
              placeholder="Enter first name"
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Last Name
            </label>
            <input
            required
            onChange={handleChange}
            value={data.lastName}
              type="text"
              name="lastName"
              placeholder="Enter last name"
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
            required
            onChange={handleChange}
            value={data.emailId}
              type="email"
              name="emailId"
              placeholder="Enter email"
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
            required
            onChange={handleChange}
            value={data.password}
              type="password"
              name="password"
              placeholder="Enter password"
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Age
            </label>
            <input
            required
            onChange={handleChange}
            value={data.age}
              type="number"
              name="age"
              placeholder="Enter age"
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Gender
            </label>
            <select
            onChange={handleChange}
              name="gender"
              required
              value={data.gender}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Photo URL */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">
              Photo URL
            </label>
            <input
            required
            onChange={handleChange}
              type="file"
              name="image"
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Skills */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">
              Skills
            </label>
            <input
            onChange={handleChange}
            value={data.skills}
              type="text"
              name="skills"
              placeholder="React, Node.js, MongoDB"
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Separate multiple skills using commas.
            </p>
          </div>

          {/* About */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">
              About
            </label>
            <textarea
              onChange={handleChange}
              value={data.about}
              name="about"
              rows="4"
              placeholder="Tell us something about yourself..."
              className="w-full border rounded-lg p-2 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl font-semibold transition"
        >
          Create Account
        </button>
      <Link to="/login" className="text-blue-500 hover:underline text-center mt-2 block">
        Already have an account? Login
      </Link>
      </form>
    </div>
  </div>
);
}

export default Signup