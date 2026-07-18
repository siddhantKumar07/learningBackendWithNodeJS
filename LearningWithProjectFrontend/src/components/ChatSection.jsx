import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { base_url } from "../utils/constants";
import { createConnection } from "../utils/socketClient";
import { useRef } from "react";
const EMPTY_CONNECTIONS = [];

const ChatSection = () => {
  const chatRef = useRef(null);
  const { id } = useParams();
  const allConnections = useSelector((store) => store.connections) ?? EMPTY_CONNECTIONS;
  const sender = useSelector((store) => store.user);

  const [receiver, setReceiver] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [storeMessage, setStoreMessage] = useState([]);

  const socketRef = useRef(null);
   useEffect(() => {
    setReceiver(null);
    setStoreMessage([]);
    const fromStore = allConnections.find((c) => c._id === id);

    if (fromStore) {
      setReceiver(fromStore);
      console.log("Receiver found in store:", fromStore);
    } else {
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
    }
  }, [id, allConnections]);

  useEffect(() => {
    if (!sender?._id || !receiver?._id) return;
socketRef.current = createConnection();

    socketRef.current .emit("joinChat", {
      senderId: sender._id,
      receiverId: receiver._id,
    });

    socketRef.current .on("receiveMessage", ({ senderName, receiverName, message,timestamp }) => {
      setStoreMessage((prev) => [...prev, { senderName, receiverName, message, timestamp }]);
      console.log(storeMessage);
    });

    // for to fetch the previous messages from the database
      try{
    const fetchMessageOnLoad =async()=>{
      const res = await axios.get(base_url+`/messages/${sender._id}/${receiver._id}`,{
        withCredentials:true
      })
      setStoreMessage(res.data.chat.messages.map((msg)=>{
        return {
          senderName:msg.senderId.firstName,
          receiverName:receiver.firstName,
          message:msg.message,
          timestamp:msg.createdAt
        }
      }))
    }
fetchMessageOnLoad();

  }catch(error){
console.log(error.message);
 }

    return () => {
      socketRef.current .disconnect();
    };
  }, [sender?._id, receiver?._id]);
   


useEffect(() => {
  const chat = chatRef.current;

  if (!chat) return;

  chat.scrollTo({
    top: chat.scrollHeight,
    behavior: "smooth",
  });
}, [storeMessage]);



  if(!storeMessage){
    return (
      <div className="h-full w-full flex items-center justify-center text-white">
        Loading messages...
      </div>
    );
  }
  if (!receiver) {
    return (
      <div className="h-full w-full flex items-center justify-center text-white">
        Loading chat...
      </div>
    );
  }

  const sendMessage = () => {
    socketRef.current .emit("sendMessage", {
      senderName: sender.firstName,
      senderId: sender._id,
      receiverId: receiver._id,
      receiverName: receiver.firstName,
      timestamp: new Date().toISOString(),
      message: newMessage,
    });
    setNewMessage("");
  };

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
      <section ref={chatRef} className="h-[80%] w-full bg-green-300 px-7 py-5 flex flex-col gap-3 overflow-auto text-black text-xl">
        {storeMessage.map((data,index)=>{
          return  (
           data.senderName === sender.firstName ?(
        <div className="chat chat-end" key={index}>
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="img"
                src={sender.photoUrl}
              />
            </div>
          </div>
          <div className="chat-header">
            {sender?.firstName || "You"}
            <time className="text-xs opacity-50">{data.timestamp}</time>
          </div>
          <div className="chat-bubble">{data.message}</div>
          <div className="chat-footer opacity-50">Delivered</div>
        </div>
            ):(
        <div className="chat chat-start" key={index}>
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="img"
                src={receiver?.photoUrl || "https://via.placeholder.com/150"}
              />
            </div>
          </div>
          <div className="chat-header">
            {receiver?.firstName || "You"}
            <time className="text-xs opacity-50">{data.timestamp}</time>
          </div>
          <div className="chat-bubble">{data.message}</div>
          <div className="chat-footer opacity-50">Seen at 12:46</div>
        </div>
            )
          )
        })}


      </section>

      <section className="h-20 mb-2 px-5 py-2">
        <div className="w-full h-full rounded-4xl flex items-center bg-gray-500 text-black px-5 gap-10">
          <div>some</div>
          <div>some</div>
          <input
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value);
            }}
            className="w-[70%] text-black font-bold text-2xl outline-none h-[90%]"
            type="text"
            placeholder="Enter your Message!!!!!!"
          />
          <button
            onClick={sendMessage}
            className="h-[70%] w-20 font-semibold rounded-3xl bg-blue-400 ml-auto text-xl cursor-pointer active:scale-90"
          >
            Send
          </button>
        </div>
      </section>
    </div>
  );
};

export default ChatSection;
