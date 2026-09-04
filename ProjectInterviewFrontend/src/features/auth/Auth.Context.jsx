import { useState } from 'react'
import { createContext } from 'react'
export const AuthContextProvider = createContext()

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  return (
    <AuthContextProvider.Provider value={{user,setUser,loading,setLoading}}>
        {children}
    </AuthContextProvider.Provider>
  )
}

export default AuthProvider