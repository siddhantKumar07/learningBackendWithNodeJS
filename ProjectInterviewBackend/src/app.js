const express = require('express');
const authRouter = require("./routes/auth.route");
const cookieParser = require("cookie-parser")
const app = express();
app.use(cookieParser());// this will parse the cookies from the request and make them available in req.cookies
app.use(express.json());
app.use("/api/auth",authRouter);

module.exports = app;