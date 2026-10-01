const mongoose = require("mongoose");

const attachmentSchema = new mongoose.Schema(
  {
    url: String,
    name: String,
    type: String,
    size: Number,
  },
  { _id: false },
);

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    message: {
      type: String,
      default: "",
    },
    attachment: {
      type: attachmentSchema,
      default: null,
    },
  },
  { timestamps: true },
);

const chatSchema = new mongoose.Schema({
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  ],
  messages: [messageSchema],
});

module.exports = mongoose.model("chat", chatSchema);