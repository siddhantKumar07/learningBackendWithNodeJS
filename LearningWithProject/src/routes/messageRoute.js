const { userAuth } = require("../middleware/auth");
const chatModel = require("../model/chat");
const uploadImage = require("../service/storage.service");
const express = require("express");
const multer = require("multer");
const path = require("path");

const messageRouter = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (_, file, callback) => {
    const allowed =
      file.mimetype.startsWith("image/") ||
      file.mimetype.startsWith("audio/") ||
      ["application/pdf", "text/plain"].includes(file.mimetype);

    callback(
      allowed
        ? null
        : new Error("Only images, audio, PDF, and text files are allowed."),
      allowed,
    );
  },
});

messageRouter.post(
  "/messages/upload",
  userAuth,
  upload.single("file"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const uploadedFile = await uploadImage(
        req.file.buffer,
        `${Date.now()}-${path.basename(req.file.originalname)}`,
      );

      if (uploadedFile?.error) {
        return res.status(500).json({
          message: uploadedFile.message,
        });
      }

      return res.status(201).json({
        attachment: {
          url: uploadedFile.url,
          name: req.file.originalname,
          type: req.file.mimetype,
          size: req.file.size,
        },
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },
);

messageRouter.get(
  "/messages/:senderId/:receiverId",
  userAuth,
  async (req, res) => {
    try {
      const { senderId, receiverId } = req.params;

      const chat = await chatModel
        .findOne({
          participants: { $all: [senderId, receiverId] },
        })
        .populate("messages.senderId", "firstName lastName photoUrl")
        .lean();

      // Return an empty chat instead of 404 for new conversations.
      return res.status(200).json({
        chat: chat || { messages: [] },
      });
    } catch (error) {
      console.error("Load messages error:", error);
      return res.status(500).json({
        message: "Failed to load messages",
      });
    }
  },
);

module.exports = messageRouter;