import { Form, Link } from 'react-router-dom'

function AuthForm({userAction}){
  
  return <>
  <Form action='' method='post'>
    <input name='username'/>
    <input name='password'/>
    {userAction === 'signup' && <input name='password-confirmation'/>}
    <button>{userAction}</button>
  </Form>
  { userAction === 'login'
  ?<p>don't have an account? click <Link to=''>here</Link> to sign up </p>
  :<p>already have an account? click <Link to=''>here</Link> to sign in </p>
  }
  </>
}

export default AuthForm;