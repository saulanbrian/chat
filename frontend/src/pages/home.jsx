import Header from '../components/header.jsx'
import ConversationDrawer from '../components/conversation-list.jsx'
import WelcomeCard from '../components/welcomecard.jsx'

import { Box,Paper, } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

import { useQueryClient } from '@tanstack/react-query'

const styles = {
  box:{
    display:'flex',
    padding:'10px',
    gap:'10px',
  }
}

function Home(){
  
  const location = useLocation()
  
  return <> 
  <Header/>
    <Box sx={styles.box}>
    {
      location.pathname === '/'?
        <>
          <ConversationDrawer/>
          <WelcomeCard sx={{display:{xs:'none',md:'flex   '}}}/>
        </>:
        <> 
          <ConversationDrawer sx={{display:{xs:'none',md:'block'}}}/>
          <Outlet/>
        </>
    }
    </Box>
  </>
}

export default Home;