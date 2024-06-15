import { Box, Paper,List, ListItem,ListItemButton} from "@mui/material"

import { useLocation } from 'react-router-dom'

function ConversationDrawer(){
  
  const location = useLocation()
  
  const styles = {
    paper:{
      // maxWidth:'35vw',
      flexGrow:1,
      display:{
        xs: location.pathname === '/' ? 'block': 'none',
        md: 'block'
      }
    }
  }  
  
  return <Paper sx={styles.paper}>
    <List>
      <ListItemButton>2</ListItemButton>
      <ListItemButton>2</ListItemButton>
      <ListItemButton>2</ListItemButton>
    </List>
  </Paper>
}

export default ConversationDrawer;