const { default: mongoose } = require('mongoose');

require('dotenv').config();

const connectDb = async()=>{
    try{
     await mongoose.connect(process.env.MONGODb_URL,{dbName:"contentCreation"});
     console.log("Database connected successfully");
    }catch(error){
        console.log("Error while connecting to database",error.message);
    }
}

module.exports = connectDb;