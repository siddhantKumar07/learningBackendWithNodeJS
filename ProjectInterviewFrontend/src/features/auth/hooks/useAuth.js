import { useContext } from "react";
import AuthProvider from "../Auth.Context.jsx";

const context = useContext(AuthProvider)

export const useAuth=()=>{
    const {user,setUser,loading,setLoading} = context;
}