import { Form, Link} from 'react-router-dom'
import { FormControl,TextField,Button,Typography } from '@mui/material'
import './static/authform.css'

function AuthForm({userAction}){
  
  return <>
  <FormControl id='form-cotrol' variant='filled'>
    <Form action='' method='post'>
    <TextField name='username' label='username'/>
    <TextField name='password' label='password' type='password'/>
    {
      userAction === 'signup' && <TextField name='password-confirmation' label='confirm password'/>
    }
    <Button variant='contained' type='submit'>{userAction}</Button>
    </Form>
  </FormControl>
  { 
    userAction === 'login'
    ?<Typography variant='subtitle2'>
        don't have an account? click <Link to='/signup'>here</Link> to sign up
     </Typography>
    :<Typography variant='subtitle2'>
      already have an account? click <Link to='/login'>here</Link> to sign in 
     </Typography>
  }
  </>
}

export default AuthForm;