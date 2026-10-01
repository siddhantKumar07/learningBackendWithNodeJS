import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";
import { base_url } from "../utils/constants";
import { createConnection } from "../utils/socketClient";
import { Images, Smile, Camera } from "lucide-react";
import AboutSection from "./aboutSection";
  import { useDispatch } from "react-redux";
import { markChatRead } from "../utils/unreadMessageSlice";

const EMPTY_CONNECTIONS = [];

const ChatSection = () => {
  const dispatch = useDispatch();

  const chatRef = useRef(null);
  const socketRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const sender = useSelector((store) => store.user);
  const allConnections =
    useSelector((store) => store.connection) || EMPTY_CONNECTIONS;

  const [receiver, setReceiver] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [storeMessage, setStoreMessage] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

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
    if (receiver?._id) {
      dispatch(markChatRead(String(receiver._id)));
    }
  }, [receiver?._id, dispatch]);

  useEffect(() => {
    if (!sender?._id || !receiver?._id) return;

    const chatSocket = createConnection();
    socketRef.current = chatSocket;

    chatSocket.emit("joinChat", {
      senderId: sender._id,
      receiverId: receiver._id,
    });

    const handleReceiveMessage = (data) => {
      setStoreMessage((previous) => [...previous, data]);
    };

    chatSocket.on("receiveMessage", handleReceiveMessage);

    const fetchMessageOnLoad = async () => {
      try {
        const res = await axios.get(
          `${base_url}/messages/${sender._id}/${receiver._id}`,
          { withCredentials: true },
        );

        const messages = (res.data.chat?.messages || []).map((msg) => ({
          senderId: msg.senderId?._id || msg.senderId,
          senderName: msg.senderId?.firstName || "",
          message: msg.message || "",
          attachment: msg.attachment || null,
          timestamp: msg.createdAt || new Date().toISOString(),
        }));

        setStoreMessage(messages);
      } catch (error) {
        console.error(
          error.response?.data?.message || "Failed to load messages",
        );
      }
    };

    fetchMessageOnLoad();

    return () => {
      chatSocket.off("receiveMessage", handleReceiveMessage);
      chatSocket.disconnect();
      socketRef.current = null;
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

  const sendMessage = async () => {
    if (
      !socketRef.current ||
      !sender?._id ||
      !receiver?._id ||
      (!newMessage.trim() && !selectedFile)
    ) {
      return;
    }

    setIsUploading(true);

    try {
      let attachment = null;

      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);

        const response = await axios.post(
          `${base_url}/messages/upload`,
          formData,
          {
            withCredentials: true,
          },
        );

        attachment = response.data.attachment;
      }

      socketRef.current.emit("sendMessage", {
        senderName: sender.firstName,
        senderId: sender._id,
        receiverId: receiver._id,
        receiverName: receiver.firstName,
        message: newMessage.trim(),
        attachment,
      });

      setNewMessage("");
      setSelectedFile(null);
    } catch (error) {
      alert(error.response?.data?.message || "File upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be 5 MB or smaller.");
      event.target.value = "";
      return;
    }

    setSelectedFile(file);
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
    <div className="grid h-full min-h-0 w-full min-w-0 grid-cols-[minmax(0,1fr)_320px] overflow-hidden bg-[#11182b] text-[#dae2fd]">
      <div className="flex min-h-0 min-w-0 flex-col overflow-hidden">
        <header className="flex h-[72px] shrink-0 items-center gap-4 border-b border-white/10 bg-[#151e34] px-5">
          <img
            src={receiver.photoUrl}
            alt={`${receiver.firstName} profile`}
            className="h-12 w-12 rounded-full object-cover ring-2 ring-primary/50"
          />

          <h1 className="truncate text-xl font-bold capitalize text-white">
            {receiver.firstName} {receiver.lastName}
          </h1>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="ml-auto rounded-xl border border-white/10 bg-white/10 px-5 cursor-pointer py-2.5 font-semibold text-white transition hover:bg-white/20 active:scale-95"
          >
            Home
          </button>
        </header>

        <section
          ref={chatRef}
          className="min-h-0 flex-1 overflow-y-auto bg-[#11182b] px-5 py-6 sm:px-8"
        >
          {!storeMessage.length ? (
            <div className="flex h-full items-center justify-center text-center text-base font-medium text-slate-400">
              No messages yet. Start the conversation!
            </div>
          ) : (
            <div className="space-y-5">
              {storeMessage.map((data, index) => {
                const isSender = data.senderId === sender._id;

                return (
                  <div
                    key={`${data.timestamp}-${index}`}
                    className={`flex items-end gap-2 ${
                      isSender ? "justify-end" : "justify-start"
                    }`}
                  >
                    {!isSender && (
                      <img
                        src={receiver.photoUrl}
                        alt=""
                        className="h-9 w-9 rounded-full object-cover"
                      />
                    )}

                    <div
                      className={`max-w-[75%] ${
                        isSender ? "items-end" : "items-start"
                      }`}
                    >
                      <p
                        className={`mb-1 text-xs text-slate-500 ${
                          isSender ? "text-right" : ""
                        }`}
                      >
                        {isSender ? "You" : receiver.firstName}
                      </p>

                      <div
                        className={`rounded-2xl px-4 py-3 text-sm leading-6 shadow-md ${
                          isSender
                            ? "rounded-br-md bg-primary text-white"
                            : "rounded-bl-md bg-[#293653] text-white"
                        }`}
                      >
                        {data.message && <p>{data.message}</p>}

                        {data.attachment?.type?.startsWith("image/") && (
                          <img
                            src={data.attachment.url}
                            alt={data.attachment.name}
                            className="mt-2 max-h-64 max-w-full rounded-xl object-cover"
                          />
                        )}

                        {data.attachment?.type?.startsWith("audio/") && (
                          <audio
                            controls
                            src={data.attachment.url}
                            className="mt-2 max-w-full"
                          />
                        )}

                        {data.attachment &&
                          !data.attachment.type?.startsWith("image/") &&
                          !data.attachment.type?.startsWith("audio/") && (
                            <a
                              href={data.attachment.url}
                              target="_blank"
                              rel="noreferrer"
                              className="mt-2 block break-all underline"
                            >
                              {data.attachment.name}
                            </a>
                          )}
                      </div>
                    </div>

                    {isSender && (
                      <img
                        src={sender.photoUrl}
                        alt=""
                        className="h-9 w-9 rounded-full object-cover"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            sendMessage();
          }}
          className="flex min-w-0 shrink-0 items-center gap-3 border-t border-white/10 bg-[#151e34] p-4"
        >
          <button
            type="button"
            aria-label="Camera"
            className="hidden rounded-xl p-2 text-slate-300 transition hover:bg-white/10 hover:text-white sm:block"
          >
            <Camera size={21} />
          </button>

          <button
            type="button"
            aria-label="Add image"
            className="hidden rounded-xl p-2 text-slate-300 transition hover:bg-white/10 hover:text-white sm:block"
          >
            <Images size={21} />
          </button>

          <label
            htmlFor="chat-file"
            className="cursor-pointer rounded-xl p-2 text-slate-300 transition hover:bg-white/10 hover:text-white"
            title="Attach file"
          >
            <Images size={21} />
          </label>

          <input
            id="chat-file"
            type="file"
            hidden
            accept="image/*,audio/*,.pdf,.txt"
            onChange={handleFileChange}
          />

          {selectedFile && (
            <span className="max-w-36 truncate text-xs text-primary">
              {selectedFile.name}
            </span>
          )}

          <div className="flex min-w-0 flex-1 items-center rounded-2xl border border-white/10 bg-[#0b1224] px-4 focus-within:border-primary/70 focus-within:ring-2 focus-within:ring-primary/20">
            <input
              value={newMessage}
              onChange={(event) => setNewMessage(event.target.value)}
              placeholder="Write a message..."
              className="h-12 min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
            />
            <Smile size={21} className="shrink-0 text-slate-400" />
          </div>

          <button
            type="submit"
            disabled={
              isUploading || (!newMessage.trim() && !selectedFile)
            }
            className="h-12 shrink-0 rounded-2xl cursor-pointer bg-primary px-6 font-bold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
          >
            {isUploading ? "Uploading..." : "Send"}
          </button>
        </form>
      </div>

      <aside className="hidden h-full min-h-0 min-w-0 overflow-y-auto overflow-x-hidden border-l border-white/10 bg-[#151e34] lg:block">
        <div className="w-full max-w-full overflow-hidden p-5">
          <AboutSection receiver={receiver} />
        </div>
      </aside>
    </div>
  );
};

export default ChatSection;
