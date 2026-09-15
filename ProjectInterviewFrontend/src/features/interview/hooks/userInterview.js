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
        throw new Error("something went wrong",error.message)
    }

}
}