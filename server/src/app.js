const express = require('express')

const app =express()

const notes=[];

// middleware  
app.use(express.json())


// post request to handle the post request from the client or postman
app.post('/notes',(req,res)=>{
    console.log(req.body)
    notes.push(req.body);
    res.status(201).json({
        message:"notes created  succesfully"
    })
})

// get method ,it is use to handle the get request
app.get('/notes',(req,res)=>{
    
    res.status(200).json({
        message:"notes fetched Successfuly",
        notes:notes
    })
})


module.exports=app