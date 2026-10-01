import { io } from "socket.io-client";
import { base_url } from "./constants";

let presenceSocket = null;
let onlineUsers = [];
const listeners = new Set();

export const createConnection = () =>
  io(base_url, {
    withCredentials: true,
    transports: ["websocket"],
  });

export const startPresence = (userId) => {
  if (!userId) return;

  if (!presenceSocket) {
    presenceSocket = createConnection();

    presenceSocket.on("presence:update", (userIds) => {
      onlineUsers = userIds.map(String);

      listeners.forEach((listener) => {
        listener(onlineUsers);
      });
    });
  }

  presenceSocket.emit("registerPresence", String(userId));
};

export const subscribeToPresence = (listener) => {
  listeners.add(listener);
  listener(onlineUsers);

  return () => listeners.delete(listener);
};

export const stopPresence = () => {
  presenceSocket?.disconnect();
  presenceSocket = null;
  onlineUsers = [];
  listeners.clear();
};
