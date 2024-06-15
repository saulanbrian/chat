import { useEffect } from 'react'

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
  const path = 'ws://127.0.0.1:8000/ws/chat'
  
  useEffect(() => {
    const socket = new WebSocket(path)
  },[])

  return <Paper sx={styles.paper}>
    <Typography variant='h6'>susi</Typography>
  </Paper>
}

export default ConversationPage;