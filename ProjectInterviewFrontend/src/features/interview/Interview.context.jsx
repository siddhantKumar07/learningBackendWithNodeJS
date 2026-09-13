import { createContext, useState } from "react";


const interviewContextProvider = createContext()

const InterviewProvider = ({children})=>{
    const [data, Setdata] = useState({})
    const [loading, Setloading] = useState(true)

    return(
        <interviewContextProvider.Provider value={{data,Setdata,loading,Setloading}}>
            {children}
        </interviewContextProvider.Provider>
    )
}
export default InterviewProvider

