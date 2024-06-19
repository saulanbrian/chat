import { createContext, useContext, useState, useEffect} from 'react'

import { jwtDecode } from 'jwt-decode'

const UserContext = createContext()

export const useUserContext = () => {
  return useContext(UserContext)
}

export const UserContextProvider = ({children}) => {
  
  const [isAuthenticated,setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user,setUser] = useState({})
  
  useEffect(() => {
    const refreshToken = localStorage.getItem('REFRESH_TOKEN')
    if (refreshToken) {
      const decoded = jwtDecode(refreshToken)
      if (decoded.exp > Date.now() / 1000){
        setUser({username:decoded.username,profile:decoded.profile})
        setIsAuthenticated(true)
      }
      else localStorage.clear()
    }
    setIsLoading(false)
  },[])
  
  function login(data){
    setIsLoading(true)
    localStorage.setItem('ACCESS_TOKEN',data.access)
    localStorage.setItem('REFRESH_TOKEN',data.refresh)
    const decoded = jwtDecode(data.access)
    setUser({username:decoded.username,profile:decoded.profile})
    setIsAuthenticated(true)
    setIsLoading(false)
  }
  
  return <UserContext.Provider value={{isAuthenticated,setIsAuthenticated,user,setUser,login,isLoading}} >
    { children }
  </UserContext.Provider>
  
}