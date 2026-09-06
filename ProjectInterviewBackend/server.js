const app = require('./src/app');
const connectDb = require('./src/config/db');
const { resume, selfDescription, jobDescription } = require('./src/dummy');
const generateInterviewReport = require('./src/services/ai.service');
// generateInterviewReport({ resume, selfDescription, jobDescription });
connectDb();


app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})