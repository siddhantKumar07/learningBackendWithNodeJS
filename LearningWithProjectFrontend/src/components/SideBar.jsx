import React from 'react'
import { Link } from 'react-router-dom'
const SideBar = () => {
  return (
    <div className='h-[90%] w-[20%] px-2 py-6 bg-base-300 flex flex-col items-start justify-center gap-4'>
       <Link to={"/"} className="bg-amber-100 w-full text-black text-xl rounded-2xl py-2 px-4">Discover</Link>
       <Link to={"/profile"} className="bg-amber-100 w-full text-black text-xl rounded-2xl py-2 px-4">Profile</Link>
       <Link to={"/connections"} className="bg-amber-100 w-full text-black text-xl rounded-2xl py-2 px-4">Connections</Link>
       <Link to={"/pendingConnections"} className="bg-amber-100 w-full text-black text-xl rounded-2xl py-2 px-4">Pending Connections</Link>

       <div className='w-full mt-auto'>
        <Link to={"/logout"} className="block w-full bg-amber-100 text-black text-xl rounded-2xl py-2 px-4">Logout</Link>
       </div>
    </div>
  )
}

export default SideBar