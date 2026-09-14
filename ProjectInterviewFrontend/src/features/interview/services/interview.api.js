import axios from "axios";
import { baseUrl } from "../../../utils/constants";

const api = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

export async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription,
}) {
  const formData = new FormData();

  formData.append("resume", resume);
  formData.append("selfDescription", selfDescription);
  formData.append("jobDescription", jobDescription);

  const response = await api.post("/interview", formData,{
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}
/**
 * @description this will return the report according to the interviewId provided
 */
export const getInterviewReportById=async(interviewId)=>{
 try{
        const response = await api.get(`/interview/report/${interviewId}`);
    return response.data;
 }catch(error){
    console.log(error.message)
 }
}

export const getAllInterviewReportsOfLoggedInUser=async()=>{
    try{
        const response = await api.get("/interview");
        return response.data;
    }catch(error){
        console.log(error.message)
    }
}