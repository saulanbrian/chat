import { Box, Paper,List, ListItem,ListItemButton,ListItemAvatar,ListItemText,Avatar,Divider} from "@mui/material"

import { useLocation,useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useGetConversations } from '../queries/conversations.jsx'

function ConversationDrawer(){
  
  const conversationsData = useGetConversations()
  const [selectedConvo,setSelectedConvo] = useState(null)
  const navigate = useNavigate()
  
  const location = window.location
  
  conversationsData.data && console.log(conversationsData.data)
  
  const styles = {
    paper:{
      // maxWidth:'35vw',
      flexGrow:1,
      display:{
        xs: location.pathname === '/' ? 'block': 'none',
        md: 'block'
      },
      minHeight:'80vh',
      padding:0
    }
  }  
  
  function handleSelect(e,convoId){
    setSelectedConvo(convoId)
    navigate(convoId)
  }
  
  return <Paper sx={styles.paper}>
  {
    conversationsData.isLoading?<h1>loading...</h1>:
    <List>
    {conversationsData.data.map(convo => {
      const user = convo.conversation_with.username
      const profile = convo.conversation_with.profile
      const message = convo.latest_message.message
      return <ListItem key={convo.id} 
                alignItems='flex-start' 
                sx={{padding:0}}>
      <ListItemButton selected={selectedConvo === convo.id} 
                      onClick={e => handleSelect(e,convo.id)}>
        <ListItemAvatar>
          <Avatar src={`http://127.0.0.1:8000${profile}`} />
        </ListItemAvatar>
        <ListItemText primary={user} 
                      secondary={message} />
      </ListItemButton>
      </ListItem>
    })}
    </List>
  }
  </Paper>
}

export default ConversationDrawer;