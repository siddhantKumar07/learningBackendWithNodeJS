import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { base_url } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
const Home = () => {
  const navigate =useNavigate()
  const dispatch = useDispatch();
  const fetchProfile = async()=>{
    const user =await axios.get(base_url+"/profile/view",{
   withCredentials: true,
    })
  if(!user.data){
    return navigate("/login")
  }
    dispatch(addUser(user.data.user))
  }

  useEffect(()=>{
    fetchProfile();
  },[])
  return (
    <div>
        <Navbar/>
        <Outlet/>
    </div>
  )
}

export default Home