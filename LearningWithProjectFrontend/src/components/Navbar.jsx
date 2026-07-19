import React, { useState ,useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { base_url } from '../utils/constants';
import {  removeUser } from '../utils/userSlice';
import { X } from 'lucide-react';
const Navbar = () => {
  const selected = useRef(null)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const loggedInData = useSelector((store) => store.user);
  const [open, setOpen] = useState(false)

  const handleLogOut =()=>{
    dispatch(removeUser())
    const response = axios.post(base_url+"/logout",{},{
      withCredentials:true
    })
    console.log(response.data);
    return navigate("/login")

  }
  return (
      <div className="h-15 bg-base-300 flex items-center justify-between w-full">
  <div className="flex px-20 h-full items-center w-[25%] ">
    <Link to={'/'} className="btn btn-ghost text-2xl">AnnonymousChat</Link>
  </div>


  <div className=" gap-2  px-10 w-[60%] h-full flex items-center">
 {loggedInData&&(
     <div className="dropdown dropdown-end w-full  mr-4 flex gap-2 items-center justify-between  ">
     <div ref={selected}className="flex gap-4 items-center justify-between w-[25%]">
       <Link className='hover:scale-110 hover:border-b-4 transition-all duration-300 backdrop-blur-3xl text-2xl text-white font-semibold' to={"/"}>Discover</Link>
      <Link className='hover:scale-110 hover:border-b-4 transition-all duration-300  text-2xl text-white font-semibold' to={"/chat"}>Chat</Link>
     </div>
      <p className='px-4 font-bold text-2xl capitalize ml-auto'>Welcome {loggedInData.firstName}</p>
      <div onClick={()=>{setOpen(!open)}} tabIndex={0} role="button" className="btn btn-ghost btn-circle  avatar">
        <div className="w-10 rounded-full">
          <img
          className='bg-cover bg-top'
            alt="Profile pic"
            src={loggedInData.photoUrl} />
        </div>
      </div>
{open&&(
        <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-42 w-60 p-2 shadow">
        <li>
          <li className="ml-auto text-lg" onClick={()=>{setOpen(false)}}>
         <X size={42} strokeWidth={2.25} />
          </li>
        </li>
        <li>
          <Link to="/profile" className="justify-between text-lg" onClick={()=>{setOpen(false)}}>
            Profile
          </Link>
        </li>
        <li >
          <Link className='text-lg' to="/pendingConnections" onClick={()=>{setOpen(false)}}>
            Pending Connections
          </Link>
        </li>
        <li >
          <Link className='text-lg' to="/connections" onClick={()=>{setOpen(false)}}>
            Connections
          </Link>
        </li>
        <li><a className='text-lg' onClick={handleLogOut}>Logout</a></li>
      </ul>

)}
    </div>
 )}
  </div>
</div>
  )
}

export default Navbar