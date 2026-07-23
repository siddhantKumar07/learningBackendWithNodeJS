const { default: mongoose } = require("mongoose");
require("dotenv").config();

const connectDb = async()=>{
try{
  await mongoose.connect(process.env.MONGO_URL,{dbName:"SpotifyBackend"});
  console.log("Database connected successfully");
}catch(error){
    console.log("Error connecting to database", error);
}
}
module.exports = connectDb;