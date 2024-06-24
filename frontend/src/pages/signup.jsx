import AuthForm from '../components/authform'
import { Box,Alert,Typography} from '@mui/material'

import { useParams, useActionData, useNavigate } from 'react-router-dom'

import api from '../api'

import './static/signup.css'

export default function Signup(){

    const data = useActionData()
    const navigate = useNavigate()

    data?.success && navigate('/login')

    return (
    <>
    <Box id='signup-main-box'>
    {
      data?.error && 
      <Alert severity='error' sx={{marginBottom:'10px'}}>
        <Typography>
            {data.error}
        </Typography>
      </Alert>
    }
    <AuthForm userAction={'signup'}/>
    </Box>
    </>
    )
}   

export async function SingupAction({request}){
    const formData = await request.formData()

    const username = formData.get('username')
    const passsword = formData.get('password')
    const confirmation = formData.get('password-confirmation')

    if (passsword != confirmation) return {error:'password do not match'}

    try{
        const res = await api.post('user/signup',{username:username,password:passsword})
        if (res.status == 201) return {success:true}
    }catch(e){
        const data = e.response.data
        for (const [key,value] of Object.entries(data)){
            return {error:value[0]}
        }
    }

}
