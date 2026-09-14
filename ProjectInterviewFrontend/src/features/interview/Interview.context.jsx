import { createContext, useState } from "react";


const interviewContextProvider = createContext()

const InterviewProvider = ({children})=>{
    const [report, Setreport] = useState(null)
    const [loading, Setloading] = useState(false)
    const [reports , Setreports] = useState([])

    return(
        <interviewContextProvider.Provider value={{report,Setreport,loading,Setloading,reports,Setreports}}>
            {children}
        </interviewContextProvider.Provider>
    )
}
export default InterviewProvider

