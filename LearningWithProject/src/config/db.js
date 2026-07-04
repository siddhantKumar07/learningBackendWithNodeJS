const mongoose = require("mongoose");

const connectDB= async()=>{
    try {
        const url = process.env.MongoDB_URL
        await mongoose.connect(url);
        console.log("connected to database successfully");
    } catch (error) {
        console.log("error while connecting to database",error);
    }
}
module.exports=connectDB;