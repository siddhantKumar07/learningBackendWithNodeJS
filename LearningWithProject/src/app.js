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
  

module.exports = app;