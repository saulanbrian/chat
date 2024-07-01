import { 
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  Typography,
  ListItemText,
  Divider
} from '@mui/material'

import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';

import { Link, useNavigate } from 'react-router-dom'

const DrawerListItemButton = (props) => {
  return (
    <ListItem disablePadding>
      <ListItemButton onClick={props.onClick}>
        { props.children }
      </ListItemButton>
    </ListItem>
  )
}

export default function CustomDrawer(props){
  
  const navigate = useNavigate()
  
  return (
  <Drawer {...props}>
    <List>
      <DrawerListItemButton onClick={() => navigate('/')}>
        <ListItemIcon>
          <HomeIcon color='primary'/>
        </ListItemIcon>
        <ListItemText primary='home'/>
      </DrawerListItemButton>
      
      <DrawerListItemButton onClick={() => navigate('/about')}>
        <ListItemIcon>
          <InfoIcon color='primary'/>
        </ListItemIcon>
        <ListItemText primary='about'/>
      </DrawerListItemButton>
      
      <DrawerListItemButton onClick={() =>navigate('/contacts')}>
        <ListItemIcon>
          <AddIcCallIcon color='primary'/>
        </ListItemIcon>
        <ListItemText primary='contacts'/>
      </DrawerListItemButton>
      
      <Divider />
      
      <DrawerListItemButton onClick={() =>navigate('/logout')}>
        <ListItemIcon>
          <LogoutIcon color='error'/>
        </ListItemIcon>
        <ListItemText primary='logout' color='danger'/>
      </DrawerListItemButton>
      
      <ListItem>
        <Typography variant='subtitle2' color={'primary'}>
          © 2024 | briansaulan
        </Typography>
      </ListItem>
    </List>   
  </Drawer>
  )
}