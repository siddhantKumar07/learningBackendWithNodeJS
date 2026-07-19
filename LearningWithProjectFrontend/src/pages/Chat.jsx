import React from 'react'
import Chatlist from '../components/Chatlist'
import ChatSection from '../components/ChatSection'
import { Outlet } from 'react-router-dom'
import bgImage from '../assets/new.jpg'
import { useDispatch } from 'react-redux'
import { addUser} from '../utils/userSlice'
import axios from 'axios'
import { base_url } from '../utils/constants'
import { useEffect } from 'react'
const Chat = () => {
  const dispatch = useDispatch()
   useEffect(()=>{
const fetchProfile = async () => {
      try {
        const response = await axios.get(`${base_url}/profile/view`, {
          withCredentials: true,
        })
        dispatch(addUser(response.data.user))
      } catch(err) {
console.log(err.response?.data?.message)
      }
    }
    fetchProfile()
   },[dispatch])
  return (
    <div
     style={{ backgroundImage: `url(${bgImage})`,backgroundSize: 'cover', backgroundPosition: 'center' }}
    className=' w-full h-screen overflow-auto bg-cover flex items-center justify-between '>
        <Chatlist/>
          <Outlet/>
    </div>
  )
}

export default Chat