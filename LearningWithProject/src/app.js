const express = require("express");
const userModel = require("./model/user");
const app = express();

app.use(express.json())//It parses incoming request body (JSON data) and converts it into a JavaScript object. it is works for all the routes in the application, allowing them to access the request body data as a javascript object through req.body. It is important to use this middleware before defining any routes that expect to receive JSON data in the request body, as it ensures that the data is properly parsed and available for use in the route handlers.

const {userAuth,adminAuth} = require("./middleware/auth")

// middleware is used to handle the unauthorized access to the routes
// it is used to check the authorization of the user before allowing access to the routes

app.use('/admin', adminAuth);
app.use('/user', userAuth);

app.get("/signUp",async(req,res)=>{
try{

    const storage = await userModel.find()

    res.status(200).json({
        message:"fetched successfully",
        storage:storage
    })
}
catch(error){
    res.status(500).json({
        message:error.message
    })
}
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
        message:"User created successfully"
    })
  }
  catch(error){
    res.status(500).json({
        message:error.message
    })
  }
})
app.delete("/signUp/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await userModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.patch("/signUp/:id",async(req,res)=>{
  try{
   const id =req.params.id;
   const data = req.body;
  await userModel.findByIdAndUpdate({_id:id},data,{new:true});
  res.status(200).json({
    message:"successfully updated"
  })
  }catch(error){
    res.status(500).json({
        message:error.message
    })
  }
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