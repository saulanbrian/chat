import {
    List,
    ListItemText,
    ListItemIcon,
    ListItem,
    ListItemAvatar,
    Avatar,
    Typography,
    ListItemButton
} from '@mui/material'

import api from '../api'

import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
 
export default function SearchResults({results,sx}){

    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const [searchResults,setSearchResults] = useState(results)
    
    async function handleClick(id){
        try{
            const res = await api.get('conversations/conversation/retrieveId/',{
                params:{user:id}})
            const conversationId = res.data.id
            queryClient.invalidateQueries(['conversations'])
            setSearchResults(undefined)
            navigate(conversationId)
        }catch(e){
            console.log(e)
        }
        
    }


    return (
        <List sx={{
            backgroundColor:'white',
            border:'1px solid black',
            display:searchResults? 'block':'none',
            borderTop:0,
            ...sx}}>
            {
                searchResults && searchResults.map(res => {
                  return (
                  <ListItem disablePadding={true} key={res.username}>
                    <ListItemButton sx={{margin:0}} onClick={e => handleClick(res.id)}>
                        <ListItemAvatar>
                            <Avatar src={res.profile} />
                        </ListItemAvatar>
                        <Typography key={res.username} paragraph={true} >{res.username}</Typography>
                    </ListItemButton>
                  </ListItem> 
                 )
                })
            }
        </List>
    )
}


