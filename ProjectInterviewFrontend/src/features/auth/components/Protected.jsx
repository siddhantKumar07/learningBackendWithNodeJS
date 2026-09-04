import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
const Protected = ({children}) => {
    const {user,loading} = useAuth();
    if(loading){
        return (
            <div className='flex justify-center items-center h-screen w-full bg-[#1e1d1d]'> 
            <h1 className="text-3xl text-white">Loading...</h1>
            </div>
        )
    }
    if(!user){
       return <Navigate to="/login" replace />;
    }
  return children
}

export default Protected