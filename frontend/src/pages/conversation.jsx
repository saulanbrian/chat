import { useEffect,useMemo } from 'react'

import Header from '../components/header.jsx'
import { Typography,Paper } from '@mui/material'

const styles = {
  paper:{
    flexGrow:1,
    padding:'5px',
    minWidth:'65vw'
  }
}

function ConversationPage(){
  const token = localStorage.getItem('ACCESS_TOKEN')
  const path = `ws://127.0.0.1:8000/ws/chat?token=${token}`
  
  useEffect(() => {
    const socket = new WebSocket(path)
    
    socket.onmessage = (e) => {
      const event = JSON.parse(e.data)
      console.log(event.message)
    }
    
  },[])

  return <Paper sx={styles.paper}>
    <Typography variant='h6'>susi</Typography>
  </Paper>
}

export default ConversationPage;