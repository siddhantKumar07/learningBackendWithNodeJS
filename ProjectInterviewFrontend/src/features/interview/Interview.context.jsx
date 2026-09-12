import { Children, createContext, useState } from "react";


const interviewContextProvider = createContext()

const interviewProvider = ({Children})=>{
    const [data, Setdata] = useState({})
    const [loading, Setloading] = useState(true)
    return(
        <interviewContextProvider.Provider value={{data,Setdata,loading,Setloading}}>
            {Children}
        </interviewContextProvider.Provider>
    )
}

