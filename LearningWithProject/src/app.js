const express = require("express");

const app = express();

app.use(express.json())
const storage=[]
app.get("/user",(req,res)=>{
    // console.log(req.params.userid);
    // console.log(req.params.name);
    console.log(req.query);
    res.status(200).json({
        message:"fetched successfully",
        storage:storage
    })
})
app.post("/user",(req,res)=>{
    console.log(req.body);
    storage.push(req.body);
    res.status(200).json({
        message:"received successfully"
    })
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
  
// middleware is used to handle the unauthorized access to the routes
// it is used to check the authorization of the user before allowing access to the routes

app.use((req,res,next)=>{
    const token = "123456789";
    const isAuthorized =token==="1234567890";
    if(!isAuthorized){
    res.status(401).json({
        message:"unauthorized access"
    })
} 
else{
    next()
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