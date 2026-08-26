const mongoose = require("mongoose");
require('dotenv').config();

const connectDb= async()=>{
  try{

 await mongoose.connect(process.env.MONGO_URI,{dbName:"InterviewProject"})
 console.log("Database connected Successfully")
 
  }catch(error){
    console.log(error.message)
  }
}

module.exports=connectDb