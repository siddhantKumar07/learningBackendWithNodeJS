import React from 'react'
import Chatlist from '../components/Chatlist'
import ChatSection from '../components/ChatSection'
import { Outlet } from 'react-router-dom'
import bgImage from '../assets/bgImage.jpg'
const Chat = () => {
  return (
    <div
     style={{ backgroundImage: `url(${bgImage})` }}
    className='overflow-hidden bg w-full h-[91%] flex items-center justify-between '>
        <Chatlist/>
          <Outlet/>
    </div>
  )
}

export default Chat