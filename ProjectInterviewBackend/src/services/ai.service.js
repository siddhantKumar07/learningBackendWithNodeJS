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
    })).description("The technical questions which can be asked in the interview along with the intention behind asking this question and how to answer this question"),
    behavioralQuestions:z.array(z.object({
        question:z.string().description("The behavioral question  can be ask in the interview"),
        intention:z.string().description("The intention behind asking this question"),
        answer:z.string().description("how to answer this questiion, whats point to be kept in mind while answering this question, and what approach to be used to answer this question etc.")
    })).description("The behavioral questions which can be asked in the interview along with the intention behind asking this question and how to answer this question"),
    skillGaps:z.array(z.object({
        skill:z.string().description("The skill which is missing in the candidate"),
        severity:z.enum(["low","medium","high"]).description("The severity of the skill gap, low means the candidate can learn this skill easily, medium means the candidate can learn this skill with some effort, high means the candidate needs to learn this skill from scratch"),
    })).description("The skill gaps in the candidate which are required for the job along with the severity of the skill gap"),
    preparationPlan:z.array(z.object({
        day:z.string().description("The day of the preparation plan"),
        focus:z.string().description("The focus of the preparation plan for that day, what to learn, what to practice, what to revise etc."),
        plan:z.string().description("The plan for that day, what to do, how to do, how much time to spend etc.")
    })).description("The preparation plan for the candidate to prepare for the interview along with the focus of the preparation plan for that day and the plan for that day")
     
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