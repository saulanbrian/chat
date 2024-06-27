import { 
  Box, 
  Paper,
  List, 
  ListItem,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
  TextField,
  Button,
  IconButton} from "@mui/material"

import SearchBar from "./searchbar.jsx"
import SearchResults from "./searchresults.jsx"

import { useLocation,useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useGetConversations } from '../queries/conversations.jsx'
import { useQueryClient } from '@tanstack/react-query'

import './static/conversation-drawer.css'


function ConversationDrawer({sx}){
  
  const queryClient = useQueryClient()
  
  const conversationsData = useGetConversations()
  const [selectedConvo,setSelectedConvo] = useState(null)
  const navigate = useNavigate()
  
  const location = window.location
  
  conversationsData.data && console.log(conversationsData.data)
  
  const styles = {
    paper:{
      minWidth:'40vw',
      flexGrow:1,
      minHeight:'85vh',
      maxHeight:'85vh',
      padding:0
    }
  }  
  
  function handleSelect(e,convoId){
    setSelectedConvo(convoId)
    navigate(convoId)
  }
  
  return <Box sx={{...styles.paper,...sx}} id='conversation-container'>
  {
    conversationsData.isLoading?<h1>loading...</h1>:
    <List>
      <SearchBar sx={{position:'relative'}}/>
    {
      conversationsData.data.map(
        convo => {
          const user = convo.conversation_with.username
          const profile = convo.conversation_with.profile
          const message = convo.latest_message.message

          return ( 
          <ListItem key={convo.id} 
                    alignItems='flex-start' 
                    sx={{padding:0,borderRadius:'20px'}}
                    >
            <ListItemButton selected={selectedConvo === convo.id} 
                            onClick={e => handleSelect(e,convo.id)}>
              <ListItemAvatar>
                <Avatar src={`http://127.0.0.1:8000${profile}`} />
              </ListItemAvatar>
              <ListItemText primary={user} 
                            secondary={message} />
            </ListItemButton>
          </ListItem>
          )
        }
      )
    }
    </List>
  }
  </Box>
}

export default ConversationDrawer;