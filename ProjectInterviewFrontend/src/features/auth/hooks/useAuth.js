import { useContext } from "react";
import AuthProvider from "../Auth.Context.jsx";
import { RegisterApi,LoginApi,LogoutApi,GetProfile } from "../services/auth.api.js";

export const useAuth=()=>{
const context = useContext(AuthProvider)
    const {user,setUser,loading,setLoading} = context;
    
}