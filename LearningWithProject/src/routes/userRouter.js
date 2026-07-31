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
    }).populate("senderId", userSafeData).populate("receiverId", userSafeData);

    const data = connections.map((connec)=>{
        if(connec.senderId._id.toString() === _id.toString()){
            return connec.receiverId
        }
        return connec.senderId
    });
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
        id:req._id,
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
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit =limit>50? 50:limit;
    const skip = (page - 1) * limit;
    const connections = await ConnectionRequestModel.find({
        $or:[
            {
                receiverId:req.user._id 
            },{
                senderId: req.user._id ,
            }
        ]
    }).select("senderId receiverId status").populate("senderId",userSafeData).populate("receiverId",userSafeData)

    const hideFromFeed = new Set();//it will store the unique user id

    connections.forEach((req)=>{
        hideFromFeed.add(req.senderId._id.toString());
        hideFromFeed.add(req.receiverId._id.toString());
    })


 hideFromFeed.add(req.user._id.toString());//it will add the logged in user id to the set so that it will not show in the feed
const feedUser = await userModel.find({
            _id:{$nin:[...hideFromFeed]}//it will get all the user which is not in the hideFromFeed set
    
}).select(userSafeData).skip(skip).limit(limit)
if(feedUser.length === 0) {
    return res.status(404).json({
        message:"no new user found in the feed"
    })
}

    return res.status(200).json({
      message: "fetched successfully",
        feedUser: feedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = userRouter;
