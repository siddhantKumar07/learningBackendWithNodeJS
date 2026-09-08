import axios from "axios"
import { baseUrl } from "../../../utils/constants"

export async function interviewApiHandle({resume,selfDescription,jobDescription}){
try{
const response = await axios.post(`${baseUrl}/api/interview`,{resume,selfDescription,jobDescription},{ withCredentials:true})
if(!response){
    console.log("no response generated")
}
return response.data

}catch(error){
    console.log(error.response?.data?.message || error.message)
}
}