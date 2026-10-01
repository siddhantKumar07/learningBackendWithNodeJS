import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { Search, Users } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { base_url } from "../utils/constants";
import { addConnection } from "../utils/connectionSlice";
import { markChatRead } from "../utils/unreadMessageSlice";
import { subscribeToPresence } from "../utils/socketClient";

const Chatlist = () => {
  const dispatch = useDispatch();
  const unread = useSelector((store) => store.unread || {});
  const location = useLocation();

  const user = useSelector((store) => store.user);
  const connections = useSelector((store) => store.connection) || [];

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    const loadConnections = async () => {
      try {
        const response = await axios.get(`${base_url}/user/connections`, {
          withCredentials: true,
        });

        dispatch(addConnection(response.data.allConnections || []));
      } catch (error) {
        console.error(error.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };

    if (!connections.length) {
      loadConnections();
    } else {
      setLoading(false);
    }
  }, [dispatch, connections.length]);

  useEffect(() => {
    const unsubscribe = subscribeToPresence((users) => {
      setOnlineUsers(users.map(String));
    });

    return unsubscribe;
  }, []);

  const chatPreview = useSelector((store) => store.chatPreview || {});

  const sortedConnections = useMemo(() => {
    return [...connections].sort((first, second) => {
      const firstDate = chatPreview[String(first._id)]?.timestamp;
      const secondDate = chatPreview[String(second._id)]?.timestamp;

      return (
        new Date(secondDate || 0).getTime() -
        new Date(firstDate || 0).getTime()
      );
    });
  }, [connections, chatPreview]);

  const filteredConnections = useMemo(() => {
    const value = search.toLowerCase().trim();

    const result = value
      ? sortedConnections.filter((connection) =>
          `${connection.firstName} ${connection.lastName}`
            .toLowerCase()
            .includes(value),
        )
      : sortedConnections;

    return result;
  }, [sortedConnections, search]);

  return (
    <div className="flex h-full min-h-0 w-full flex-col overflow-hidden bg-[#080d1d] text-[#dae2fd]">
      <header className="shrink-0 border-b border-white/10 p-4">
        <div className="mb-4 flex items-center gap-3">
          <img
            src={user?.photoUrl}
            alt="Your profile"
            className="h-11 w-11 rounded-full object-cover ring-2 ring-primary/30"
          />

          <div className="min-w-0">
            <h2 className="truncate text-lg font-bold text-[#dae2fd]">Chats</h2>
            <p className="text-xs text-slate-400">
              {connections.length} conversations
            </p>
          </div>
        </div>

        <label className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#11182b] px-3 transition focus-within:border-primary/60 focus-within:ring-2 focus-within:ring-primary/20">
          <Search size={17} className="shrink-0 text-slate-400" />

          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search conversations"
            className="h-11 min-w-0 flex-1 bg-transparent text-sm text-[#dae2fd] outline-none placeholder:text-slate-500"
          />
        </label>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto p-3">
        {loading ? (
          <div className="flex justify-center py-8">
            <span className="loading loading-spinner text-slate-500" />
          </div>
        ) : (
          <div className="space-y-1">
            {filteredConnections.map((connection) => {
              const preview = chatPreview[String(connection._id)];
              const previewText =
                preview?.message ||
                (preview?.attachment ? "Attachment received" : "Start a conversation");

              const chatPath = `/chat/${connection._id}`;
              const isSelected = location.pathname === chatPath;

              const isOnline = onlineUsers.includes(String(connection._id));

              return (
                <Link
                  key={connection._id}
                  to={chatPath}
                  onClick={() => dispatch(markChatRead(String(connection._id)))}
                  className={`flex w-full items-center gap-3 rounded-2xl border p-3 transition-colors duration-200 ${
                    isSelected
                      ? "border-primary/40 bg-primary/10 shadow-lg shadow-primary/10"
                      : "border-transparent hover:bg-white/[0.06]"
                  }`}
                >
                  <div className="relative shrink-0">
                    <img
                      src={connection.photoUrl}
                      alt={`${connection.firstName} ${connection.lastName}`}
                      loading="lazy"
                      className={`h-12 w-12 rounded-full object-cover ${
                        isSelected
                          ? "ring-2 ring-primary ring-offset-2 ring-offset-[#080d1d]"
                          : ""
                      }`}
                    />

                    {isOnline && (
                      <span
                        title="Online"
                        className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-[#080d1d] bg-emerald-400"
                      />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p
                      className={`truncate capitalize ${
                        isSelected
                          ? "font-bold text-[#dae2fd]"
                          : "font-semibold text-slate-300"
                      }`}
                    >
                      {connection.firstName} {connection.lastName}
                    </p>

                    <p className="mt-1 truncate text-xs text-slate-500">
                      {previewText}
                    </p>
                  </div>

                  {unread[String(connection._id)] > 0 && (
                    <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                      {unread[String(connection._id)] > 99
                        ? "99+"
                        : unread[String(connection._id)]}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Chatlist;