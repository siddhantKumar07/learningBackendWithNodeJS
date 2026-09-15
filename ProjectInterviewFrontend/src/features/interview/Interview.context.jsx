import { createContext, useState } from "react";


export const interviewContext = createContext(null)

const InterviewProvider = ({children})=>{
    const [report, Setreport] = useState(null)
    const [loading, Setloading] = useState(false)
    const [reports , Setreports] = useState([])

    return(
        <interviewContext.Provider value={{report,Setreport,loading,Setloading,reports,Setreports}}>
            {children}
        </interviewContext.Provider>
    )
}
export default InterviewProvider

