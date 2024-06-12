import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

const api = axios.create({
  baseURL:import.meta.env.VITE_API_URL
})

const refreshToken = async(token) => {
  
  try{
    const res = await axios.post('http://127.0.0.1:8000/auth/token/refresh/',{refresh:token})
    return res.data.access
  }catch(e){
    console.log(e.response.data)
    return null
  }
  
}

api.interceptors.request.use(async(config) => {
    
  const access = localStorage.getItem('ACCESS_TOKEN')
  console.log(config)
    
  if(access){
    let latestToken = access
    const decoded = jwtDecode(access)
    if(decoded.exp < Date.now() / 1000){
      latestToken = await refreshToken(latestToken)
    }
    config.headers.Authorization = `Bearer ${latestToken}`
  }
  
  return config
})

export default api;