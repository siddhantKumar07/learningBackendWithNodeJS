import React, { useMemo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import {
  Bell,
  ChevronDown,
  Clock3,
  Heart,
  LogOut,
  MessageCircle,
  Search,
  User,
  X,
} from "lucide-react";
import { base_url } from "../utils/constants.js";
import { removeUser } from "../utils/userSlice.js";
import { clearFeed } from "../utils/feedSlice.js";
import {
  clearAllUsers,
  updateUserConnectionStatus,
} from "../utils/allUsersSlice.js";
import {
  createConnection,
  startPresence,
} from "../utils/socketClient";
import { addUnreadMessage } from "../utils/unreadMessageSlice.js";
import { updateChatPreview } from "../utils/chatPreviewSlice.js";
import toast from "react-hot-toast";

const showMessageToast = (navigate, message, senderId) => {
  toast.custom(
    (toastItem) => (
      <button
        type="button"
        onClick={() => {
          toast.dismiss(toastItem.id);
          navigate(`/chat/${senderId}`);
        }}
        className={`flex w-[350px] items-center gap-3 rounded-2xl border border-white/10 bg-[#151e34] p-3 text-left shadow-2xl shadow-black/40 transition ${
          toastItem.visible
            ? "animate-in slide-in-from-right-5"
            : "animate-out fade-out"
        }`}
      >
        <img
          src={message.senderPhotoUrl || "/default-avatar.png"}
          alt=""
          onError={(event) => {
            event.currentTarget.src = "/default-avatar.png";
          }}
          className="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-primary/40"
        />

        <span className="min-w-0 flex-1">
          <span className="flex items-center justify-between gap-2">
            <strong className="truncate text-sm text-white">
              {message.senderName || "New message"}
            </strong>
            <span className="text-[10px] text-slate-500">now</span>
          </span>
          <span className="mt-1 block truncate text-xs text-slate-400">
            {message.message || "Sent an attachment"}
          </span>
        </span>

        <span
          onClick={(event) => {
            event.stopPropagation();
            toast.dismiss(toastItem.id);
          }}
          className="rounded-lg p-1 text-slate-500 hover:bg-white/10 hover:text-white"
        >
          <X size={16} />
        </span>
      </button>
    ),
    {
      id: `message-${senderId}-${message.timestamp}`,
      duration: 5000,
      position: "top-right",
    },
  );
};

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const loggedInData = useSelector((store) => store.user);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [requestingUserId, setRequestingUserId] = useState(null);
  const allUsers = useSelector((store) => store.allUsers);
  const unread = useSelector((store) => store.unread || {});
  const unreadTotal = Object.values(unread).reduce(
    (total, count) => total + count,
    0,
  );

  useEffect(() => {
    if (!loggedInData?._id) return;

    startPresence(String(loggedInData._id));

    const notificationSocket = createConnection();

    notificationSocket.emit(
      "registerPresence",
      String(loggedInData._id),
    );

    const handleNotification = (message) => {
      const senderId = String(message.senderId);
      const currentChatId = window.location.pathname.split("/")[2];

      dispatch(
        updateChatPreview({
          ...message,
          senderId,
          timestamp: message.timestamp || new Date().toISOString(),
        }),
      );

      if (currentChatId !== senderId) {
        dispatch(addUnreadMessage({ ...message, senderId }));
        showMessageToast(navigate, message, senderId);
      }
    };

    notificationSocket.on("newMessageNotification", handleNotification);

    return () => {
      notificationSocket.off("newMessageNotification", handleNotification);
      notificationSocket.disconnect();
    };
  }, [loggedInData?._id, dispatch, navigate]);

  const handleLogOut = async () => {
    try {
      await axios.post(
        `${base_url}/logout`,
        {},
        { withCredentials: true },
      );
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(removeUser());
      dispatch(clearFeed());
      dispatch(clearAllUsers());
      navigate("/login");
    }
  };

  const isDiscoverActive =
    location.pathname === "/" || location.pathname.startsWith("/profile");

  const isChatActive = location.pathname.startsWith("/chat");
  const searchResults = useMemo(() => {
    const normalizedTerm = searchTerm.trim().toLowerCase();

    if (!normalizedTerm) return [];

    return allUsers
      .filter((user) =>
        `${user.firstName} ${user.lastName || ""}`
          .toLowerCase()
          .includes(normalizedTerm) ||
        user.skills?.some((skill) =>
          skill.toLowerCase().includes(normalizedTerm),
        ),
      )
      .slice(0, 8);
  }, [allUsers, searchTerm]);

  const sendConnectionRequest = async (userId) => {
    setRequestingUserId(userId);

    try {
      await axios.post(
        `${base_url}/request/send/interested/${userId}`,
        {},
        { withCredentials: true },
      );
      dispatch(
        updateUserConnectionStatus({
          userId,
          status: "interested",
        }),
      );
      toast.success("Connection request sent");
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to send request");
    } finally {
      setRequestingUserId(null);
    }
  };

  const navClass = (active) =>
    `flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition ${
      active
        ? "bg-primary/15 text-primary"
        : "text-slate-300 hover:bg-white/10 hover:text-white"
    }`;

  if (!loggedInData) return null;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 px-4 text-white shadow-xl backdrop-blur-xl sm:px-8">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between">
        <Link
          to="/"
          className="text-xl font-black tracking-tight transition hover:scale-105 sm:text-2xl"
        >
          <span className="text-primary">Anonymous</span>
          <span className="text-white">Chat</span>
        </Link>

        <nav className="flex items-center gap-2">
          <Link
            to="/"
            className={`${navClass(isDiscoverActive)} hidden md:flex`}
            aria-current={isDiscoverActive ? "page" : undefined}
          >
            Discover
          </Link>

          <Link
            to="/chat"
            className={`${navClass(isChatActive)} relative hidden md:flex`}
          >
            <MessageCircle size={18} />
            Chat

            {unreadTotal > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                {unreadTotal > 99 ? "99+" : unreadTotal}
              </span>
            )}
          </Link>

          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setSearchOpen((value) => !value);
                setSearchTerm("");
              }}
              className={navClass(searchOpen)}
              aria-label={searchOpen ? "Close user search" : "Search users"}
              aria-expanded={searchOpen}
            >
              {searchOpen ? <X size={18} /> : <Search size={18} />}
              {searchOpen ? "Close" : "Search"}
            </button>

            {searchOpen && (
              <>
                <button
                  type="button"
                  aria-label="Close user search"
                  onClick={() => setSearchOpen(false)}
                  className="fixed inset-0 z-40 h-full w-full cursor-default"
                />
                <div className="absolute right-0 top-12 z-50 w-80 rounded-2xl border border-white/10 bg-slate-900 p-3 shadow-2xl shadow-black/40">
                <input
                  autoFocus
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search by name or skill..."
                  className="input input-sm w-full rounded-xl border-white/10 bg-white/5 text-white placeholder:text-slate-500 focus:border-primary focus:outline-none"
                />

                {searchTerm.trim() && (
                  <div className="mt-2 max-h-80 space-y-1 overflow-y-auto">
                    {searchResults.length ? (
                      searchResults.map((user) => (
                        <div
                          key={user._id}
                          className="flex items-center gap-3 rounded-xl p-2 hover:bg-white/5"
                        >
                          <img
                            src={user.photoUrl}
                            alt=""
                            className="h-10 w-10 rounded-full object-cover"
                          />
                          <span className="min-w-0 flex-1 truncate text-sm font-semibold capitalize text-white">
                            {user.firstName} {user.lastName}
                          </span>
                          {user.connectionStatus === "accepted" ? (
                            <button
                              type="button"
                              title="Open chat"
                              aria-label={`Chat with ${user.firstName}`}
                              onClick={() => navigate(`/chat/${user._id}`)}
                              className="btn btn-success btn-square btn-sm rounded-lg"
                            >
                              <MessageCircle size={16} />
                            </button>
                          ) : user.connectionStatus === "interested" ? (
                            <span
                              title="Connection request already sent"
                              className="flex items-center gap-1 rounded-lg bg-white/10 px-2 py-1 text-xs text-slate-400"
                            >
                              <Clock3 size={14} />
                              Sent
                            </span>
                          ) : (
                            <button
                              type="button"
                              disabled={requestingUserId === user._id}
                              onClick={() => sendConnectionRequest(user._id)}
                              className="btn btn-primary btn-xs rounded-lg"
                            >
                              {requestingUserId === user._id
                                ? "Sending..."
                                : "Connect"}
                            </button>
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="px-2 py-3 text-sm text-slate-400">
                        No users found
                      </p>
                    )}
                  </div>
                )}
                </div>
              </>
            )}
          </div>
        </nav>

        <div className="flex items-center gap-3">
          <p className="hidden text-sm text-slate-300 lg:block">
            Welcome,{" "}
            <span className="font-bold capitalize text-white">
              {loggedInData.firstName}
            </span>
          </p>

          <button
            aria-label="Notifications"
            className="hidden rounded-xl p-2 text-slate-300 transition hover:bg-white/10 hover:text-white sm:block"
          >
            <Bell size={20} />
          </button>

          <div className="relative">
            <button
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 pr-3 transition hover:border-primary/60 hover:bg-white/10"
            >
              <img
                src={loggedInData.photoUrl}
                alt={`${loggedInData.firstName}'s profile`}
                className="h-10 w-10 rounded-full object-cover"
              />
              <ChevronDown
                size={16}
                className={`hidden transition-transform sm:block ${
                  open ? "rotate-180" : ""
                }`}
              />
            </button>

            {open && (
              <>
                <button
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="fixed inset-0 z-40 h-full w-full cursor-default"
                />

                <div className="absolute right-0 top-14 z-50 w-64 overflow-hidden rounded-2xl border border-white/10 bg-slate-900 p-2 shadow-2xl shadow-black/40">
                  <div className="flex items-center gap-3 border-b border-white/10 px-3 py-3">
                    <img
                      src={loggedInData.photoUrl}
                      alt=""
                      className="h-11 w-11 rounded-full object-cover"
                    />
                    <div className="min-w-0">
                      <p className="truncate font-bold capitalize">
                        {loggedInData.firstName} {loggedInData.lastName}
                      </p>
                      <p className="truncate text-xs text-slate-400">
                        {loggedInData.emailId}
                      </p>
                    </div>
                    <button
                      onClick={() => setOpen(false)}
                      className="ml-auto rounded-lg p-1 text-slate-400 hover:bg-white/10 hover:text-white"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <div className="mt-2 space-y-1">
                    <Link
                      to="/profile"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
                    >
                      <User size={18} />
                      Profile
                    </Link>

                    <Link
                      to="/pendingConnections"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
                    >
                      <Bell size={18} />
                      Pending connections
                    </Link>

                    <Link
                      to="/connections"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
                    >
                      <Heart size={18} />
                      Connections
                    </Link>

                    <button
                      onClick={handleLogOut}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-red-400 transition hover:bg-red-500/10"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
