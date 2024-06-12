import { useUserContext } from '../src/context/usercontext.jsx'
import { Navigate } from 'react-router-dom'

export default function Private ({children}) {
  const { isLoading, isAuthenticated } = useUserContext()
  
  if(isLoading) return <h1>loading</h1>
  
  return isAuthenticated? children: <Navigate to='/login' />
  
}