const express = require("express");
const userModel = require("./model/user");
const bcrpt = require("bcrypt");
const cookieParser = require("cookie-parser")
const jsonWebToken = require("jsonwebtoken");
require("dotenv").config();
const { userAuth } = require("./middleware/auth")
const app = express();
const {checkChanges}= require("./utils/validation");
app.use(express.json()); //It parses incoming request body (JSON data) and converts it into a JavaScript object. it is works for all the routes in the application, allowing them to access the request body data as a javascript object through req.body. It is important to use this middleware before defining any routes that expect to receive JSON data in the request body, as it ensures that the data is properly parsed and available for use in the route handlers.

app.use(cookieParser()) //it is used to parse the cookies from the request headers and make them available in the req.cookies object. It is important to use this middleware before defining any routes that expect to access cookies, as it ensures that the cookies are properly parsed and available for use in the route handlers.

const authRouter = require("./routes/authRouter");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/userRouter");
const cors = require("cors");

app.use(cors())
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);





module.exports = app;
