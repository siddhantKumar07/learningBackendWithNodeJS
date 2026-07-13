const express = require("express");
const { userAuth } = require("../middleware/auth");
const userRouter = express.Router();
const ConnectionRequestModel = require("../model/connectionRequest");
const userModel = require("../model/user");

const userSafeData = [
  "firstName",
  "lastName",
  "photoUrl",
  "age",
  "gender",
  "skills",
  "about",
];
// it will return all the connection which is accepted
userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const { _id } = loggedInUser;
    const connections = await ConnectionRequestModel.find({
      $or: [
        {
          senderId: _id,
          status: "accepted",
        },
        {
          receiverId: _id,
          status: "accepted",
        },
      ],
    }).populate("senderId", userSafeData);

    console.log(connections);
    const data = connections.map((connec)=>({
        senderId: connec.senderId,
    }));
    if (connections.length === 0) {
      return res.status(404).json({
        message: "connections not found",
      });
    }

    return res.status(200).json({
      message: "connection is fetched",
      allConnections:data
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// for to get all the pending connection request for the logged in user

userRouter.get("/user/pendingRequest", userAuth, async (req, res) => {
  try {
    const { _id } = req.user;

    const pendingRequest = await ConnectionRequestModel.find({
      receiverId: _id,
      status: "interested",
    }).populate("senderId",userSafeData);
    //. populate is used to get the data from the senderId which is a reference to the user model and we are getting the firstName,lastName,photoUrl,age,gender,skills,about from the user model.
    
    const data = pendingRequest.map((req)=>({
        senderId:req.senderId
    }))

    if (pendingRequest.length === 0) {
      return res.status(404).json({
        message: "pending request is not found",
      });
    }
    return res.status(200).json({
      message: "pending request is fetched successfully",
      allPendingRequest: data,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// for to get all the user data in the feed of the logged in user
userRouter.get("/user/feed", userAuth, async (req, res) => {
  try {
    const storage = await userModel.find();

    // it will return the user data in the required format and it will not return the password and other sensitive data.
    const users = storage.map((user) => ({
      firstName: user.firstName,
      lastName: user.lastName,
      photoUrl: user.photoUrl,
      age: user.age,
      gender: user.gender,
      skills: user.skills,
      about: user.about,
    }));

    if (users.length === 0) {
      return res.status(404).json({
        message: "no user found",
      });
    }

    if (storage.length === 0) {
      return res.status(404).json({
        message: "no user found",
      });
    }

    res.status(200).json({
      message: "fetched successfully",
      users: users,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = userRouter;
