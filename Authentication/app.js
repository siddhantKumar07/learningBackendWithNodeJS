const express = require("express");
const authRouter = require("./src/routes/Auth.routes");
const cookieParser = require("cookie-parser");
const postRouter = require("./src/routes/post.routes");
const app = express();
app.use(express.json())//
app.use(cookieParser());// through this we can access the cookies in the request object
app.use("/api/auth",authRouter);
app.use("/api/post",postRouter);





module.exports = app;