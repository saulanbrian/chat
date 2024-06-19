import { 
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText
}

export const SentMessage = ({message}) => {
  return <ListItem>
  <ListItemAvatar>
    <Avatar srcSet={message.sender.profile} />
  </ListItemAvatar>
  <ListItemText primary={message.message} />
  </ListItem>
}

export const ReceivedMessage = ({message}) => {
  
}