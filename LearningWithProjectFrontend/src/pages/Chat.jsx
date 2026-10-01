import React, { useEffect } from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { MessageCircle } from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import Chatlist from "../components/Chatlist.jsx";
import { addUser } from "../utils/userSlice.js";
import { base_url } from "../utils/constants.js";

const Chat = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${base_url}/profile/view`, {
          withCredentials: true,
        });

        dispatch(addUser(response.data.user));
      } catch (error) {
        console.error(error.response?.data?.message);
      }
    };

    fetchProfile();
  }, [dispatch]);

  return (
    <div className="flex h-dvh w-full flex-col overflow-hidden bg-[#080d1d]">
      <Navbar />

      <main className="flex min-h-0 w-full flex-1 overflow-hidden text-[#dae2fd]">
        <section className="flex h-full w-full min-w-0 overflow-hidden">
          <aside className="flex h-full w-[290px] shrink-0 flex-col border-r border-white/10 bg-[#080d1d] lg:w-[340px]">
            <header className="flex shrink-0 items-center gap-3 border-b border-white/10 px-5 py-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                <MessageCircle size={21} />
              </div>

              <div className="min-w-0">
                <h1 className="truncate text-xl font-black text-[#dae2fd]">
                  Messages
                </h1>
                <p className="truncate text-xs text-slate-400">
                  Your conversations
                </p>
              </div>
            </header>

            <div className="min-h-0 flex-1 overflow-y-auto">
              <Chatlist />
            </div>
          </aside>

          <section className="min-h-0 min-w-0 flex-1 overflow-hidden bg-[#11182b]">
            <div className="h-full min-h-0 w-full min-w-0">
              <Outlet />
            </div>
          </section>
        </section>
      </main>
    </div>
  );
};

export default Chat;
