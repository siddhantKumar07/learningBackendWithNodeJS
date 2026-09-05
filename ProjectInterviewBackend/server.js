const app = require('./src/app');
const connectDb = require('./src/config/db');
const invokeGemini = require('./src/services/ai.service')
connectDb();
invokeGemini();


app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})