import AuthForm from '../components/authform.jsx'

import { useActionData, Navigate } from 'react-router-dom'
import { useUserContext } from '../context/usercontext.jsx'
import { useEffect } from 'react'

import api from '../api.jsx'

import { jwtDecode } from 'jwt-decode'

function Login(){
  const data = useActionData()
  const { isAuthenticated, login } = useUserContext()
  
  useEffect(() => {
    if(data) login(data)
  },[data])
  
  if(isAuthenticated) return <Navigate to='/' />

  return <AuthForm userAction={'login'} />
  
  
}

export default Login;

export async function LoginAction({request}){
  const data = await request.formData();
  
  const username = data.get('username')
  const password = data.get('password')
  
  try{
    const res = await api.post('auth/token/',{
      username:username,
      password:password
    })
    return res.data
  }catch(e){
    console.log((e))
    console.log(e.response)
    return null
  }
}