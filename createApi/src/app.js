const express = require('express')
const app=express()
const noteModel = require('./models/note.models')
app.use(express.json())




// this is for to handle the post request
app.post('/note',async(req,res)=>{
    const data = req.body;
   await noteModel.create({
        title:data.title,  
        description:data.description
    })
   console.log(req.body);
   
    res.status(201).json({
        message:"note created"
    })
})

// this is for to handle the get request 
app.get('/note',async(req,res)=>{
   const note= await noteModel.find()
    res.status(200).json({
        message:"notes fetched Successfully",
        note:note
    })
})


// this is used to handle the delete request 

app.delete('/note/:id',async(req,res)=>{
    const id= req.params.id;
    await noteModel.findOneAndDelete({
        _id:id
    })

    res.status(200).json({
        message:"note deleted successfully"
    })
})

// this is used to handle the updation
app.patch('/note/:id',async(req,res)=>{
    const id = req.params.id;
    const title = req.body.title;
    const description =req.body.description;
    await noteModel.findOneAndUpdate({_id:id},{description:description})

     res.status(200).json({
        message:"updation completed"
     })
})


module.exports=app