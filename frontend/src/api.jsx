import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

const backendUrl = import.meta.env.VITE_API_URL || "choreo-apis/chatapp/backend/v1"

console.log(backendUrl)

const api = axios.create({
  baseURL:backendUrl
})

const refreshToken = async(token) => {
  
  try{
    const res = await axios.post(`${backendUrl}/auth/token/refresh/`,{refresh:token})
    localStorage.setItem('ACCESS_TOKEN',res.data.access)
    return res.data.access
  }catch(e){
    console.log(e.response.data)
    return null
  }
  
}

api.interceptors.request.use(async(config) => {
    
  const access = localStorage.getItem('ACCESS_TOKEN')
  const refresh = localStorage.getItem('REFRESH_TOKEN')
    
  if(access){
    let latestToken = access
    const decoded = jwtDecode(access)
    if(decoded.exp < Date.now() / 1000){
      latestToken = await refreshToken(refresh)
    }
    config.headers.Authorization = `Bearer ${latestToken}`
  }
  
  return config
})

export default api;