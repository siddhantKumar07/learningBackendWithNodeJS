import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Compass, User, Heart, MessageSquare, Radio, LogOut, Sparkles } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
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
      await axios.post(`${base_url}/logout`, {}, { withCredentials: true });
      dispatch(removeUser());
      dispatch(clearFeed());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  const menuItems = [
    { path: "/", label: "Discover", icon: Compass },
    { path: "/profile", label: "Profile", icon: User },
    { path: "/connections", label: "Connections", icon: Heart },
    { path: "/chat", label: "Messages", icon: MessageSquare },
    {
      path: "/pendingConnections",
      label: "Pending Requests",
      icon: Radio,
    },
  ];

  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  const linkClass = (path) =>
    `group flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-300 ${
      isActive(path)
        ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/25"
        : "text-slate-300 hover:translate-x-1 hover:bg-white/10 hover:text-white"
    }`;

  const unread = useSelector((store) => store.unread || {});
  const unreadTotal = Object.values(unread).reduce((total, count) => total + count, 0);

  return (
    <aside className="flex h-full w-full flex-col border-r border-white/10 bg-slate-950/95 px-4 py-6 text-white shadow-2xl backdrop-blur-xl lg:w-72">

      <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500">
        Menu
      </p>

      <nav className="space-y-2">
        {menuItems.map(({ path, label, icon: Icon }) => (
          <Link
            key={path}
            to={path}
            aria-current={isActive(path) ? "page" : undefined}
            className={`${linkClass(path)} relative`}
          >
            <Icon
              size={21}
              strokeWidth={location.pathname === path ? 2.5 : 1.8}
            />

            <span>{label}</span>

            {label === "Messages" && unreadTotal > 0 && (
              <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                {unreadTotal > 99 ? "99+" : unreadTotal}
              </span>
            )}
          </Link>
        ))}
      </nav>

      <div className="mt-auto border-t border-white/10 pt-5">
        <button
          onClick={handleLogOut}
          className="cursor-pointer group flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-300 transition-all duration-300 hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOut
            size={21}
            className="rotate-180 transition-transform duration-300 group-hover:-translate-x-1 cursor-pointer"
          />
          Logout
        </button>
      </div>

      <div className="mt-3 flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-300 transition-all duration-300 hover:bg-white/10 hover:text-white">
        <Sparkles size={21} strokeWidth={1.8} />
        <span>{unreadTotal} unread messages</span>
      </div>
    </aside>
  );
};

export default SideBar;
