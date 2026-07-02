console.log("Hello, World!");
const express = require("express");

const app = express();

app.use(express.json())

app.get("/user",(req,res)=>{
    res.status(200).json({
        message:"fetched successfully"
    })
})
app.post("/user",(req,res)=>{
    console.log(req.body);
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
  

module.exports = app;