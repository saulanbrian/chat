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

import { useGetConversations } from '../queries/conversations.jsx'

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

const backendUrl = import.meta.env.VITE_API_URL

function ConversationPage(){
  
  const queryClient = useQueryClient()
  
  const { convoId } = useParams()
  const { data,isLoading:messageLoading,isError } = useGetMessages(convoId)
  const {data:conversations,isLoading:conversationsLoading} = useGetConversations()
  
  const token = localStorage.getItem('ACCESS_TOKEN')
  const path = `wss://${backendUrl}/ws/conversation/${convoId}/?token=${token}`

  const [connectedToSocket,setConnectedToSocket] = useState(false)
      
  const socket = useMemo(() => {
    return new WebSocket(path)
  },[convoId])

  
  let convoIndex;
  if(conversations) convoIndex = parseInt(conversations.findIndex(convo => convo.id === convoId))
      
  const messageRef = useRef(undefined)

  socket.onopen = () => {
    setConnectedToSocket(true)
  }

  socket.onclose = () => {
    setConnectedToSocket(false)
  }
      
  socket.onmessage = (e) => {
    const data = JSON.parse(e.data)
    queryClient.setQueryData(['messages',convoId],(prev) => {
      const messageExists = prev.messages.some((msg) => {
        return msg.id === data.id
      })
      if (messageExists) return prev
      else return {
        ...prev,  
        messages:[...prev.messages,data]
        }
    })
    queryClient.invalidateQueries(['conversations'])
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
      {conversationsLoading || messageLoading ? (
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