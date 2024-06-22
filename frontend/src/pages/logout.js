import { useUserContext } from "../context/usercontext"
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

export default function Logout(){

    const {setIsAuthenticated} = useUserContext()
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    queryClient.invalidateQueries()
    localStorage.clear()
    setIsAuthenticated(false)
    return navigate('/')
}
