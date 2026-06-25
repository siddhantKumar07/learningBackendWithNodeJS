const mongoose = require('mongoose');

async function connectDB(){
    await mongoose.connect("mongodb+srv://siddhantk80044_db_user:INrskI5x2cLQqIX8@cluster0.8lkcekl.mongodb.net/?appName=Cluster0/note")

    console.log("connected to db");
    
}
module.exports=connectDB