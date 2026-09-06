const  { GoogleGenAI } = require("@google/genai");
import * as z from "zod";
require("dotenv").config();
const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY,
});


const interviewReportSchema =z.object({
    technicalQuestions:
})

async function generateInterviewReport({resume,selfDescription,jobDescription}){



}

// const invokeGemini =async()=>{
// try{
//     const response = await ai.models.generateContent({
//   model: "gemini-3-flash-preview ",
//   contents: "define love",
// });

//     return response.text;
// }catch(err){
//     console.log(err.message)
// }
// }

module.exports = invokeGemini