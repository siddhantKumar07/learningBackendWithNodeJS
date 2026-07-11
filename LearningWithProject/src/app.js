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

// feed Api
app.get("/feed", async (req, res) => {
  try {
    const storage = await userModel.find();

    res.status(200).json({
      message: "fetched successfully",
      storage: storage,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});







// update user though gmail
app.patch("/user", async (req, res) => {
  const gmail = req.query.email;
  const data = req.body;
  try {
    checkChanges(data);//it will check whether the data is allowed to update or not if not then it will throw an error
    const updatedUser = await userModel.findOneAndUpdate(
      { emailId: gmail },
      data,
      { new: true, runValidators: true },
    );
    if (!updatedUser) {
      return res.status(404).json({
        message: "user not found",
      });
    }
    res.status(200).json({
      message: "user updated successfully",
      updatedUser: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// update user through id
app.patch("/user/:id", async (req, res) => {
      const id = req.params?.id;
    const data = req.body;
  try {
checkChanges(data);//it will check whether the data is allowed to update or not if not then it will throw an error
   const updatedUser= await userModel.findByIdAndUpdate({ _id: id }, data, { new: true,runValidators:true });
    res.status(200).json({
      message: "successfully updated",
      updatedUser: updatedUser
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});



module.exports = app;
