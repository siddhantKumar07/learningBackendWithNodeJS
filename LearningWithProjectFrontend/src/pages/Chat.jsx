import React from 'react'
import Chatlist from '../components/Chatlist'
import ChatSection from '../components/ChatSection'
import { Outlet } from 'react-router-dom'

const Chat = () => {
  return (
    <div className='overflow-hidden w-full h-[91%] flex items-center justify-between '>
        <Chatlist/>
          <Outlet/>
    </div>
  )
}

export default Chat