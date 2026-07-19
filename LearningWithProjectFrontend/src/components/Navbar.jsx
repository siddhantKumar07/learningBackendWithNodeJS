import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { base_url } from '../utils/constants';
import {  removeUser } from '../utils/userSlice';
const Navbar = () => {
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
      <div className="navbar bg-base-300 shadow-sm ">
  <div className="flex-1">
    <Link to={'/'} className="btn btn-ghost text-xl">AnnonymousChat</Link>
  </div>
  <div className="flex gap-2">
 {loggedInData&&(
     <div className="dropdown dropdown-end mr-4 flex gap-2 items-center p-1 ">
      <Link className='text-2xl text-white font-semibold' to={"/chat"}>Chat</Link>
      <p className='px-4 font-bold text-lg'>Welcome {loggedInData.firstName}</p>
      <div onClick={()=>{setOpen(!open)}} tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Profile pic"
            src={loggedInData.photoUrl} />
        </div>
      </div>
{open&&(
        <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-32 w-72 p-2 shadow">
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