const express = require('express');
const cookieParser = require("cookie-parser")
const authRouter = require('./routes/auth.route');
const accountRouter = require('./routes/acount.route');
const app = express();
app.use(express.json());
app.use(cookieParser());


// auth router 
app.use("/api/auth",authRouter);


// account router
app.use("/api/account",accountRouter);
module.exports = app;