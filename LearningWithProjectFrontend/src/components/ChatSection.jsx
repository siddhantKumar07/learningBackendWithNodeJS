import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { base_url } from "../utils/constants";
import { createConnection } from "../utils/socketClient";
import { Images, Smile, Camera } from "lucide-react";

const EMPTY_CONNECTIONS = [];

const ChatSection = () => {
  const chatRef = useRef(null);
  const socketRef = useRef(null);

  const { id } = useParams();
  const allConnections = useSelector((store) => store.connections) ?? EMPTY_CONNECTIONS;
  const sender = useSelector((store) => store.user);

  const [receiver, setReceiver] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [storeMessage, setStoreMessage] = useState([]);

  useEffect(() => {
    setReceiver(null);
    setStoreMessage([]);

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
  }, [id, allConnections]);

  useEffect(() => {
    if (!sender?._id || !receiver?._id) return;

    socketRef.current = createConnection();

    socketRef.current.emit("joinChat", {
      senderId: sender._id,
      receiverId: receiver._id,
    });

    socketRef.current.on("receiveMessage", ({ senderId, senderName, receiverName, message, timestamp }) => {
      setStoreMessage((prev) => [
        ...prev,
        {
          senderId,
          senderName,
          receiverName,
          message,
          timestamp,
        },
      ]);
    });

    const fetchMessageOnLoad = async () => {
      try {
        const res = await axios.get(
          base_url + `/messages/${sender._id}/${receiver._id}`,
          { withCredentials: true }
        );

        const messages = (res.data.chat.messages || []).map((msg) => ({
          senderId: msg.senderId._id || msg.senderId,
          senderName: msg.senderId.firstName || "",
          message: msg.message || msg.text,
          timestamp: msg.createdAt || new Date().toISOString(),
        }));

        setStoreMessage(messages);
      } catch (err) {
        console.log(err.response?.data?.message || "Failed to load messages");
      }
    };

    fetchMessageOnLoad();

    return () => {
      socketRef.current?.off("receiveMessage");
      socketRef.current?.disconnect();
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

  const sendMessage = () => {
    if (!socketRef.current || !sender?._id || !receiver?._id || !newMessage.trim()) return;

    socketRef.current.emit("sendMessage", {
      senderName: sender.firstName,
      senderId: sender._id,
      receiverId: receiver._id,
      receiverName: receiver.firstName,
      timestamp: new Date().toISOString(),
      message: newMessage,
    });

    setNewMessage("");
  };

  if (!sender) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-white/5 backdrop-blur-3xl text-white">
        Loading user...
      </div>
    );
  }

  if (!receiver) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-white/5 backdrop-blur-3xl text-white">
        Loading chat...
      </div>
    );
  }

  return (
    <div className="h-full w-full flex flex-col backdrop-blur-3xl bg-white/5 justify-between border-l-2 border-black overflow-auto scrollbar-thumb-white/50">
      <nav className="w-full flex items-center justify-start gap-8 h-16 backdrop-blur-3xl bg-black/40 border-transparent border-2 px-5">
        <div className="w-14 h-14 rounded-full border-2">
          <img
            className="rounded-full h-14 w-14 object-cover border"
            src={receiver.photoUrl}
            alt=""
          />
        </div>
        <h1 className="text-2xl font-semibold text-white capitalize">
          {receiver.firstName} {receiver.lastName}
        </h1>
      </nav>

      <section
        ref={chatRef}
        className="h-[80%] w-full px-7 py-5 flex flex-col gap-3 overflow-auto text-black text-xl"
      >
        {storeMessage.map((data, index) =>
          data.senderId === sender._id ? (
            <div className="chat chat-end" key={index}>
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img alt="img" src={sender.photoUrl} />
                </div>
              </div>
              <div className="chat-header">
                {sender.firstName || "You"}
                <time className="text-xs opacity-50">{data.timestamp}</time>
              </div>
              <div className="chat-bubble bg-red-700 backdrop-blur-3xl shadow-2xl font-semibold max-w-120">
                {data.message}
              </div>
            </div>
          ) : (
            <div className="chat chat-start" key={index}>
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="img"
                    src={receiver.photoUrl || "https://via.placeholder.com/150"}
                  />
                </div>
              </div>
              <div className="chat-header">
                {receiver.firstName || "User"}
                <time className="text-xs opacity-50">{data.timestamp}</time>
              </div>
              <div className="chat-bubble backdrop-blur-3xl bg-purple-700 max-w-120 font-semibold shadow-2xl">
                {data.message}
              </div>
            </div>
          )
        )}
      </section>

      <section className="h-20 px-5 py-2 backdrop-blur-3xl bg-black/40">
        <div className="w-full h-full rounded-4xl flex items-center text-black px-5 gap-10">
          <div><Camera className="cursor-pointer" size={36} strokeWidth={1.75} /></div>
          <div><Images className="cursor-pointer" size={36} strokeWidth={1.75} /></div>
          <div className="w-[70%] backdrop-blur-3xl bg-black/40 rounded-full text-white h-[90%] flex items-center gap-3 px-5">
            <input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="w-[95%] rounded-full px-7 text-white font-semibold text-2xl outline-none h-[90%]"
              type="text"
              placeholder="Enter your Message!!!!!!"
            />
            <Smile className="cursor-pointer" size={36} />
          </div>
          <button
            onClick={sendMessage}
            className="h-[80%] w-40 font-semibold rounded-3xl bg-blue-400 ml-auto text-2xl cursor-pointer active:scale-90"
          >
            Send
          </button>
        </div>
      </section>
    </div>
  );
};

export default ChatSection;
