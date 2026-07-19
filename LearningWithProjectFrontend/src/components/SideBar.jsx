import React from 'react'
import { Link } from 'react-router-dom'
import { Compass,User,Heart,MessageSquare,Radio } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { removeUser } from '../utils/userSlice'
import { base_url } from '../utils/constants'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const SideBar = () => {
      const dispatch = useDispatch()
      const navigate = useNavigate()
      const handleLogOut =()=>{
        dispatch(removeUser())
        const response = axios.post(base_url+"/logout",{},{
          withCredentials:true
        })
        console.log(response.data);
        return navigate("/login")
      }
  return (
    <div className='h-[100%] w-[25%] bg-[#131B2E] px-2 py-6  flex flex-col items-start justify-center gap-4'>
       <Link to={"/"} className="hover:bg-[#293058] hover:transition-all ease-linear duration-800  w-full text-white text-xl rounded-2xl flex gap-2 py-2 px-4"><Compass size={26} />Discover</Link>
       <Link to={"/profile"} className="hover:bg-[#293058] hover:transition-all duration-800  w-full text-white text-xl flex rounded-2xl py-2 gap-2 px-4"><User size={26} />Profile</Link>
       <Link to={"/connections"} className="hover:bg-[#293058] hover:transition-all duration-800  w-full text-white text-xl flex rounded-2xl gap-2 py-2 px-4"><Heart size={26} />Connections</Link>
       <Link to={"/chat"} className="hover:bg-[#293058] hover:transition-all duration-800  w-full text-white text-xl flex rounded-2xl gap-2 py-2 px-4"><MessageSquare size={26} />Messages</Link>
       <Link to={"/pendingConnections"} className="hover:bg-[#293058] hover:transition-all duration-800   w-full text-white text-xl flex gap-2 rounded-2xl py-2 px-4"><Radio size={26} />Pending Connections</Link>

       <div className='w-full mt-auto'>
        <Link onClick={handleLogOut} className="hover:bg-[#293058] hover:transition-all duration-800  block w-full  text-white text-xl rounded-2xl py-2 px-4">Logout</Link>
       </div>
    </div>
  )
}

export default SideBar