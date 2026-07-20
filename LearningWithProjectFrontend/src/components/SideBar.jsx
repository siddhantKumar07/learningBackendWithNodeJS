import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Compass, User, Heart, MessageSquare, Radio, LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { clearFeed } from "../utils/feedSlice";
import { base_url } from "../utils/constants";
import axios from "axios";

const SideBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogOut = async () => {
    try {
      await axios.post(base_url + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      dispatch(clearFeed());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  const linkClass = (path) =>
    `w-full text-white text-xl rounded-2xl flex gap-2 py-2 px-2 ${
      location.pathname === path ? "bg-[#293058]" : "hover:bg-[#293058]"
    }`;

  return (
    <div className="h-full border-r-2 border-[#293058] w-[22%] bg-[#131B2E] px-2 py-6 flex flex-col items-start justify-center gap-4">
      <Link to="/" className={linkClass("/")}>
        <Compass size={26} />
        Discover
      </Link>

      <Link to="/profile" className={linkClass("/profile")}>
        <User size={26} />
        Profile
      </Link>

      <Link to="/connections" className={linkClass("/connections")}>
        <Heart size={26} />
        Connections
      </Link>

      <Link to="/chat" className={linkClass("/chat")}>
        <MessageSquare size={26} />
        Messages
      </Link>

      <Link to="/pendingConnections" className={linkClass("/pendingConnections")}>
        <Radio size={26} />
        Pending Connections
      </Link>

      <div className="w-full mt-auto">
        <button
          onClick={handleLogOut}
          className="w-full flex items-center gap-2 hover:bg-[#293058] text-white text-xl rounded-2xl py-2 px-4"
        >
          <LogOut className="rotate-180" strokeWidth={1.5} /> Logout
        </button>
      </div>
    </div>
  );
};

export default SideBar;
