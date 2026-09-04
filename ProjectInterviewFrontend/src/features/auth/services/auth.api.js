import axios from "axios"
import { baseUrl } from "../../../utils/constants"

export async function RegisterApi({username,email,password}){
    console.log("RegisterApi called")
    console.log(username,email,password)
    try{
   const response = await axios.post(`${baseUrl}/auth/register`,{
    username,
    email,
    password
   },
   {withCredentials:true})
   console.log(response?.data?.message)
   return response?.data
    }catch(err){
console.log(err?.response?.data || err.message)
    }
}

export async function LoginApi({email,password}){
    try{
const response = await axios.post(`${baseUrl}/auth/login`,{
    email,
    password
   },
   {withCredentials:true})
   console.log(response?.data?.message)
   return response?.data
    }catch(err){
  console.log(err?.response?.data || err.message)
  throw err
    }
}
export async function LogoutApi(){
    try{
   const response = await axios.get(`${baseUrl}/auth/logout`,{withCredentials:true});
   return response?.data
    }catch(error){
        console.log(error?.data?.message||error.message);
    }
}
// for to handle the profle api which is baseUrl/profile to get the data
export async function GetProfile(){
    try{
 const response = await axios.get(`${baseUrl}/auth/profile`,{withCredentials:true})
      return response?.data
    }catch(error){
        console.log(error.message ||error?.data.message);
    }
}