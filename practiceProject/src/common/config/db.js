import mongoose from "mongoose";
import "dotenv/config";


const connnectDB = async()=>{
    try{
    const URL = process.env.MONGO_URI;
    const connection =await mongoose.connect(URL, { dbName: 'LearnFromHitesh' });
    console.log(`connected to database successfully : ${connection.connection.host}`);
    }catch(err){
        console.log("error while connecting to database", err);
    }
}
export default connnectDB;