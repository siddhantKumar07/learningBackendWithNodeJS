const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = async ()=>{
    try {
   await mongoose.connect(process.env.MONGODb_URL,{dbName:"BankingSystem"});
   console.log("Connected to MongoDB successfully");
    }catch(error){
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit the process with an error code
    }
}
module.exports = connectDB;