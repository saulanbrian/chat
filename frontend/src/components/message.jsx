import { 
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText
} from '@mui/material'

const styles = {
  sent:{
    borderRadius:5,
    background:'#fa2c83',
    width:'fit-content',
    maxWidth:'70%',
    marginLeft:'auto',
    marginRight:'5px',
    marginBottom:'3px',
  },
  received:{
    borderRadius:5,
    width:'fit-content',
    maxWidth:'70%',
    marginRight:'auto',
    marginBottom:'3px',
  }
}

export const ReceivedMessage = ({message,profile}) => {
  console.log(`profile: ${profile}`)
  return <ListItem sx={styles.received}>
  <ListItemAvatar>
    <Avatar srcSet={`http://127.0.0.1:8000${profile}`} />
  </ListItemAvatar>
  <ListItemText sx={{'color':'inherit'}}>
    {message.message}
  </ListItemText>
  </ListItem>
}

export const SentMessage = ({message}) => {
  return <ListItem sx={styles.sent}>
  <ListItemText sx={{'color':'white'}}>
    {message.message}
  </ListItemText>
  </ListItem>
}