import { useEffect,useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useGetMessages } from '../queries/messages.jsx'
import { useQueryClient } from '@tanstack/react-query'

import Header from '../components/header.jsx'
import { 
  Typography,
  Paper,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'

const styles = {
  paper:{
    flexGrow:1,
    padding:'5px',
    minWidth:'65vw',
    minHeight:'80vh',
  }
}

function ConversationPage(){

  const token = localStorage.getItem('ACCESS_TOKEN')
  const path = `ws://127.0.0.1:8000/ws/chat?token=${token}`
  
  const { convoId } = useParams()
  const { data,isLoading,isError } = useGetMessages(convoId)

  
  useEffect(() => {
    if(data){
      const socket = new WebSocket(path)
      
      socket.onmessage = (e) => {
        const event = JSON.parse(e.data)
        console.log(event.message)
      }
    }
  },[data])

  return <Paper sx={styles.paper}>
  { isLoading? <CircularProgress/>
  :data.map((message) => {
    return <h1 key={message.id}>{message.message}</h1>
  }) }
  </Paper>

}

export default ConversationPage;