import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { base_url } from "../utils/constants";

const ChatSection = () => {
  const { id } = useParams();
  const allConnections = useSelector((store) => store.connections || []);
  const [receiver, setReceiver] = useState(null);
const sender = useSelector((store) => store.user || null);
  useEffect(() => {
    const fromStore = allConnections.find((c) => c._id === id);
    if (fromStore) {
      setReceiver(fromStore);
      return;
    }

    const loadConnections = async () => {
      try {
        const res = await axios.get(base_url + "/user/connections", {
          withCredentials: true,
        });
        const found = (res.data.allConnections || []).find((c) => c._id === id);
        setReceiver(found || null);
      } catch (err) {
        console.log(err.response?.data?.message || "Failed to load receiver");
      }
    };

    loadConnections();
  }, [allConnections, id]);

  if (!receiver) {
    return (
      <div className="h-full w-full flex items-center justify-center text-white">
        Loading chat...
      </div>
    );
  }

  return (
    <div className="bg-fuchsia-700 h-full w-full flex flex-col justify-between border-l-4 border-black">
      <nav className="w-full flex items-center justify-start gap-10 h-16 border-b-2 bg-white text-black px-5">
        <div className="w-14 h-14 rounded-full border-2">
          <img
            className="rounded-full h-14 w-14 object-cover border"
            src={receiver.photoUrl}
            alt=""
          />
        </div>
        <h1 className="text-4xl font-semibold text-gray-800 capitalize">
          {receiver.firstName} {receiver.lastName}
        </h1>
      </nav>
       <section className="h-[80%] w-full bg-green-300 px-7 py-5 flex flex-col gap-3 overflow-auto text-black text-xl">
        
    <div className="chat chat-start">
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img
        alt="Tailwind CSS chat bubble component"
        src={receiver.photoUrl}
      />
    </div>
  </div>
  <div className="chat-header">
    {receiver.firstName}
    <time className="text-xs opacity-50">12:45</time>
  </div>
  <div className="chat-bubble">hello how are you!</div>
  <div className="chat-footer opacity-50">Delivered</div>
</div>
<div className="chat chat-end">
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img
        alt="Tailwind CSS chat bubble component"
        src={sender?.photoUrl || "https://via.placeholder.com/150"}
      />
    </div>
  </div>
  <div className="chat-header">
   {sender?.firstName || "You"}
    <time className="text-xs opacity-50">12:46</time>
  </div>
  <div className="chat-bubble">I hate you!</div>
  <div className="chat-footer opacity-50">Seen at 12:46</div>
</div>
       </section>
       
      <section className="h-20 mb-2 px-5 py-2">
        <div className="w-full h-full rounded-4xl flex items-center bg-gray-500 text-black px-5 gap-10">
          <div>some</div>
          <div>some</div>
          <input
            className="w-[70%] text-black font-bold text-2xl outline-none h-[90%]"
            type="text"
            placeholder="Enter your Message!!!!!!"
          />
          <button className="h-[70%] w-20 font-semibold rounded-3xl bg-blue-400 ml-auto text-xl cursor-pointer active:scale-90">
            Send
          </button>
        </div>
      </section>
    </div>
  );
};

export default ChatSection;