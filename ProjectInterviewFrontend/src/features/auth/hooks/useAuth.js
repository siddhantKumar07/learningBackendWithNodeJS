import { useContext } from "react";
import {AuthContextProvider} from "../Auth.Context.jsx";
import { RegisterApi,LoginApi,LogoutApi,GetProfile } from "../services/auth.api.js";

export const useAuth=()=>{
const context = useContext(AuthContextProvider)
    const {user,setUser,loading,setLoading} = context;

    const handleLogin =async({email,password})=>{
        setLoading(true)
        try{
            const data = await LoginApi({email,password})
            setUser(data?.user)
            setLoading(false)
        }
        catch(err){
            setLoading(false)
            throw err
        }
    }

    const handleRegister = async ({username,email,password})=>{
        setLoading(true);
        try{
          const data = await RegisterApi({username,email,password})
          setUser(data?.user);
          setLoading(false)
        }catch(error){
            setLoading(false)
            throw error
        }
    }

    const handleLogout= async()=>{
        setLoading(true);
         const data = await LogoutApi();
         setUser(null);
         setLoading(false)
    }

    return{
        user,
        loading,
        handleLogin,
        handleRegister,
        handleLogout
    }
}
