const { default: mongoose } = require('mongoose');

require('dotenv').config()

const connectDb =async ()=>{
    try{
     await mongoose.connect(process.env.MONGODb_URL,{dbName:"Authentication"})
     console.log("Database connected successfully");
    }catch(error){
        console.log(error);
    }
}
module.exports = connectDb;