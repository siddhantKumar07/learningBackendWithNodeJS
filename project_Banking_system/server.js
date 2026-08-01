const app = require('./src/app');
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const connectDB = require('./src/config/db');

connectDB();

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
    
})