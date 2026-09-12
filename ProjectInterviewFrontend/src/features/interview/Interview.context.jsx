import { createContext, useState } from "react";


const interviewContextProvider = createContext()

const InterviewProvider = ({Children})=>{
    const [data, Setdata] = useState({})
    const [loading, Setloading] = useState(true)

    return(
        <interviewContextProvider.Provider value={{data,Setdata,loading,Setloading}}>
            {Children}
        </interviewContextProvider.Provider>
    )
}
export default InterviewProvider

