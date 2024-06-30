import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Login, { LoginAction } from './pages/login.jsx'
import Home from './pages/home.jsx'
import ConversationPage from './pages/conversation.jsx'
import Logout from './pages/logout.js'
import Signup,{SingupAction} from './pages/signup.jsx'

import { UserContextProvider } from './context/usercontext.jsx'

import Private from '../utils/privatewrapper.jsx'

import { createTheme,ThemeProvider } from '@mui/material/styles';
import About from './pages/about.jsx'
import Contacts from './pages/contacts.jsx'



const theme = createTheme({
  palette:{
    primary:{
      main:'#ec407a'
    },
    secondary:{
      main:'#039be5'
    }
  }
})

const router = createBrowserRouter([  
    {
      path:'/',
      element:<Private><Home /></Private>,
      children:[
      {   
        path:':convoId',
        element:<ConversationPage />,
      },
      ]
    },
    {
      path:'about',
      element:<About/>
    },
    {
      path:'contacts',
      element: <Contacts />
    },
    {
      path:'login',
      element:<Login />,
      action:LoginAction,
    },
    {
      path:'logout',
      element:<Logout />
    },
    {
      path:'signup',
      element:<Signup />,
      action:SingupAction
    }
  ])


const queryClient = new QueryClient()

export default function App(){
  
  return <ThemeProvider theme={theme}>
  <UserContextProvider>
    <QueryClientProvider client={queryClient} >
      <RouterProvider router={router} />
    </QueryClientProvider>
  </UserContextProvider>
  </ThemeProvider>
}