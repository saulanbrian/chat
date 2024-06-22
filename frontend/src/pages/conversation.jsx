import { useEffect,useMemo,useState,useRef} from 'react'
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
  ListItemButton,
  Box,
  TextField,
  TextareaAutosize,
  Button
} from '@mui/material'

import AutoScrollBox  from '../components/autoscrollbox.jsx'

import { SentMessage, ReceivedMessage } from '../components/message.jsx'

const styles = {
  box:{
    flexGrow:1,
    paddingTop:'20px',
    minHeight:'85vh',
    maxHeight:'85vh',
    overflow:'auto',
    display:'flex',
    flexDirection:'column'
  },
  messageInput:{
    position:'sticky',
    bottom:0,
    display:'flex',
    backgroundColor:'white',
    justifyContent:'center',
    marginTop:'auto'
  }
}

function ConversationPage(){
  
  const queryClient = useQueryClient()
  
  const { convoId } = useParams()
  const { data,isLoading,isError } = useGetMessages(convoId)
  
  const token = localStorage.getItem('ACCESS_TOKEN')
  const path = `ws://127.0.0.1:8000/ws/conversation/${convoId}/?token=${token}`

  const [connectedToSocket,setConnectedToSocket] = useState(false)
      
  const socket = useMemo(() => {
    return new WebSocket(path)
  },[])

  const messageRef = useRef(undefined)
      
  socket.onopen = () => {
    console.log('connection established')
    setConnectedToSocket(true)
  }

  socket.onclose = () => {
    setConnectedToSocket(false)
  }
      
  socket.onmessage = (e) => {
    const data = JSON.parse(e.data)
    queryClient.setQueryData(['messages',convoId],(prev) => ({
      ...prev,  
      messages:[...prev.messages,data]
    }))
  }
  
  function handleClick(e){
    const message = messageRef.current.value.trim()
    messageRef.current.value = ''
    message && socket.send(JSON.stringify({
      'message':message
    }))
  }


  function handleKeyDown(e){
    if (e.key == 'Enter'){
      handleClick(e)
    } 
  }

  return (
    <AutoScrollBox sx={styles.box}>
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
      {
        data && <ListItem sx={styles.messageInput} component='div'>
        <TextField inputRef={messageRef} 
                   variant='outlined' 
                   label='message' 
                   sx={{flexGrow:1}}
                   onKeyDown={handleKeyDown} />
        <Button onClick={handleClick} disabled={Boolean(!connectedToSocket)}>
          Send
        </Button>
      </ListItem>
      }
    </AutoScrollBox>
  );

}

export default ConversationPage;