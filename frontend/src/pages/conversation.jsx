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
  Box
} from '@mui/material'
import { SentMessage, ReceivedMessage } from '../components/message.jsx'

const styles = {
  box:{
    flexGrow:1,
    paddingTop:'20px'
  }
}

function ConversationPage(){
  
  const queryClient = useQueryClient()
  
  const { convoId } = useParams()
  const { data,isLoading,isError } = useGetMessages(convoId)
  
  if(data) console.log(data)
  
  const token = localStorage.getItem('ACCESS_TOKEN')
  const path = `ws://127.0.0.1:8000/ws/conversation/${convoId}/?token=${token}`
  
      
  const socket = useMemo(() => {
    return new WebSocket(path)
  },[])
      
  socket.onopen = () => {
    console.log('connection established')
  }
      
  socket.onmessage = (e) => {
    const data = JSON.parse(e.data)
    queryClient.setQueryData(['messages',convoId],(prev) => ({
      ...prev,
      messages:[...prev.messages,data]
    }))
  }
  
  function handleClick(e){
    const message = document.getElementById('message')
    socket.send(JSON.stringify({
      'message':message.value
    }))
  }

  return (
    <Box sx={styles.box}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        data.messages.map((message) => (
          message.sent_by_user ? (
            <SentMessage key={message.id} 
                         message={message}
                         />
          ) : (
            <ReceivedMessage 
              key={message.id} 
              message={message}
              profile={data.conversation_with.profile}/>
          )
        ))
      )}
      <input id='message' style={{marginTop:'auto'}} />
      <button onClick={handleClick}>send</button>
    </Box>
  );

}

export default ConversationPage;