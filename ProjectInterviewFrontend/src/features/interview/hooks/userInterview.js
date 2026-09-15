import { useContext, useState } from "react"
import {generateInterviewReport,getInterviewReportById,getAllInterviewReportsOfLoggedInUser} from '../services/interview.api'
import InterviewProvider  from '../Interview.context'
const useInterview = ()=>{
const context = useContext(InterviewProvider)
if(!context ){
    throw new Error("useInterview must be used within an InterviewProvider")
}
const {report,Setreport,loading,Setloading,reports,Setreports} = context;

const generateReport=async({
      resume,
  selfDescription,
  jobDescription,

})=>{
    try{
     Setloading(true)
     const response = await generateInterviewReport({resume,selfDescription,jobDescription});
     await Setreport(response)
        Setloading(false)
    }catch(error){
        Setloading(true)
        throw new Error("something went wrong",error.message)
    }

}

const getReportById=async(interviewId)=>{
    try{
        Setloading(true)
     const response = await getInterviewReportById(interviewId);
     await Setreport(response)
     Setloading(false)
    }catch(error){
        Setloading(true)
        throw new Error("something wrong in get Report by id",error.message)
    }
}

const getAllLoggedinReport= async ()=>{
    try{
  Setloading(true)
  const response = await getAllInterviewReportsOfLoggedInUser();
  await Setreports(response) 
  Setloading(false)
    }catch(error){
        Setloading(true)
        throw new Error("error in getAllLoggedinReport ",error.message)
    }
}
return{
    getAllLoggedinReport,
    getReportById,
    generateReport

}
}