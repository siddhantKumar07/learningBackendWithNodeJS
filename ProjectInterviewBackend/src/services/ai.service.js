const  { GoogleGenAI } = require("@google/genai");
import * as z from "zod";
require("dotenv").config();
const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY,
});


const interviewReportSchema =z.object({
    technicalQuestions:z.array(z.object({
        question:z.string().description("The technical question  can be ask in the interview"),
        intention:z.string().description("The intention behind asking this question"),
        answer:z.string().description("how to answer this questiion, whats point to be kept in mind while answering this question, and what approach to be used to answer this question etc.")
    }))
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