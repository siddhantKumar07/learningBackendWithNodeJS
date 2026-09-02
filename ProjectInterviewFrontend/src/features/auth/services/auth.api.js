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