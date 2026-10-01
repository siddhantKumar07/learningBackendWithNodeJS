const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

const cors = require("cors");
const isAllowedOrigin = (origin) =>
    !origin ||
    origin === "http://localhost:5173" ||
    origin === "https://learning-backend-with-node-js-g1um-5heao5cg7.vercel.app";

const corsOptions = {
    origin: (origin, callback) => {
        if (isAllowedOrigin(origin)) return callback(null, true);
        return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/authRouter");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/userRouter");
const messageRouter = require("./routes/messageRoute");

app.use("/", messageRouter);
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

app.use((error, req, res, next) => {
  if (error.code === "LIMIT_FILE_SIZE") {
    return res.status(413).json({
      message: "File size must be 5 MB or smaller.",
    });
  }

  if (error.message?.includes("Only images")) {
    return res.status(400).json({
      message: error.message,
    });
  }

  next(error);
});

module.exports = app;
