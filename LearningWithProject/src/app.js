const express = require("express");
const userModel = require("./model/user");
const app = express();

app.use(express.json())
const storage=[]
const {userAuth,adminAuth} = require("./middleware/auth")

// middleware is used to handle the unauthorized access to the routes
// it is used to check the authorization of the user before allowing access to the routes

app.use('/admin', adminAuth);
app.use('/user', userAuth);
app.get("/user",(req,res)=>{
    // console.log(req.params.userid);
    // console.log(req.params.name);
    console.log(req.query);
    res.status(200).json({
        message:"fetched successfully",
        storage:storage
    })
})
app.post("/signUp",async(req,res)=>{
  try{
      console.log(req.body);
    const data = req.body;
    userModel.create({
        firstName:data.firstName,
        lastName:data.lastName,
        emailId:data.emailId,
        age:data.age,
        password:data.password,
        gender:data.gender
    })
    res.status(200).json({
        message:"received successfully"
    })
  }
  catch(error){
    res.status(500).json({
        message:error.message
    })
  }
})
app.delete("/user",(req,res)=>{
    res.status(200).json({
        message:"deleted successfully"
    })
})
app.patch("/user",(req,res)=>{
    console.log(req.body);
    res.status(200).json({
        message:"updated successfully"
    })
})
  


// for admin also 
app.get('/admin/addUser',(req,res)=>{
    res.status(200).json({
        message:"admin fetched successfully"
    })
})
app.get('/admin/deleteUser',(req,res)=>{
    res.status(200).json({
        message:"admin fetched successfully"
    })
})

module.exports = app;