const socket = require("socket.io");
const crypto = require("crypto");
const chatModel = require("../model/chat");

const createRoomId = (senderId, receiverId) =>
  crypto
    .createHash("sha256")
    .update([senderId, receiverId].sort().join("_"))
    .digest("hex");

const intializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  // userId -> connected socket IDs
  const onlineUsers = new Map();

  const broadcastPresence = () => {
    io.emit("presence:update", Array.from(onlineUsers.keys()));
  };

  io.on("connection", (socket) => {
    socket.on("registerPresence", (userId) => {
      socket.userId = String(userId);
      socket.join(String(userId));

      const userSockets = onlineUsers.get(socket.userId) || new Set();
      userSockets.add(socket.id);
      onlineUsers.set(socket.userId, userSockets);

      broadcastPresence();
    });

    socket.on("joinChat", ({ senderId, receiverId }) => {
      const roomId = createRoomId(senderId, receiverId);
      socket.join(roomId);
    });

    socket.on(
      "sendMessage",
      async ({
        senderName,
        senderId,
        receiverId,
        receiverName,
        message,
        attachment,
      }) => {
        const roomId = createRoomId(senderId, receiverId);

        try {
          const messageData = {
            senderId,
            message: message || "",
            attachment: attachment || null,
          };

          const chat = await chatModel.findOne({
            participants: { $all: [senderId, receiverId] },
          });

          if (chat) {
            chat.messages.push(messageData);
            await chat.save();
          } else {
            await chatModel.create({
              participants: [senderId, receiverId],
              messages: [messageData],
            });
          }

          const notification = {
            senderId: String(senderId),
            senderName,
            receiverId: String(receiverId),
            receiverName,
            message: message || "",
            attachment: attachment || null,
            timestamp: new Date().toISOString(),
          };

          io.to(roomId).emit("receiveMessage", notification);
          io.to(String(receiverId)).emit("newMessageNotification", notification);
        } catch (error) {
          console.error("Message save error:", error);
        }
      },
    );

    socket.on("disconnect", () => {
      if (!socket.userId) return;

      const userSockets = onlineUsers.get(socket.userId);

      if (!userSockets) return;

      userSockets.delete(socket.id);

      if (userSockets.size === 0) {
        onlineUsers.delete(socket.userId);
      }

      broadcastPresence();
    });
  });
};

module.exports = intializeSocket;