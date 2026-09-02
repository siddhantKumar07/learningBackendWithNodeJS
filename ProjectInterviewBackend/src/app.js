const express = require('express');
const authRouter = require("./routes/auth.route");
const cookieParser = require("cookie-parser")
const cors = require("cors");
const app = express();
app.use(cookieParser());// this will parse the cookies from the request and make them available in req.cookies
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST","PATCH", "PUT", "DELETE", "OPTIONS"],
}));
app.use("/api/auth",authRouter);

module.exports = app;