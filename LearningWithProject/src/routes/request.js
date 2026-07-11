const express = require("express");
const {userAuth} = require("../middleware/auth");

const requestRouter = express.Router();

requestRouter.post("/sendConnectionReuest",userAuth,(req,res)=>{
  try{
    const {user}=req;
    res.status(200).json({
      message:`${user.firstName} ${user.lastName} is sending connection request`
    })


  }catch(errorr){
    res.status(500).json({
      message:error.message
    })
  }
})

module.exports = requestRouter;