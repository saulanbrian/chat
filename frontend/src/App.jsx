import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


import Login, { LoginAction } from './pages/login.jsx'

import { UserContextProvider } from './context/usercontext.jsx'

import Private from '../utils/privatewrapper.jsx'

const router = createBrowserRouter([  
    {
      path:'',
      element:<Private><h1>home</h1></Private>
    },
    {
      path:'login',
      element:<Login />,
      action:LoginAction,
    },
  ])

export default function App(){
  
  return <UserContextProvider>
    <RouterProvider router={router} />
  </UserContextProvider>
}