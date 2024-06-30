import { 
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Button, 
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItem,
  ListItemText,
  Drawer,
  Divider,
  Avatar
} from '@mui/material'

import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';

import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../context/usercontext.jsx'

import './static/header.css'

import { useState } from 'react'


export default function Header(){
  const [anchorEl,setAnchorEl] = useState(null)
  const menuState = Boolean(anchorEl)
  
  const [drawerOpen,setDrawerOpen] = useState(false)
  
  const navigate = useNavigate()
  
  const { user } = useUserContext()
  
  function toggleDrawer(){
    setDrawerOpen(false)
  }
  
  const closeMenu = () => {
    setAnchorEl(null)
  }
  
  const openDrawer = (e) => {
    setDrawerOpen(true)
  }
  
  const openMenu = (e) => {
    setAnchorEl(e.target)
  }
  
  return (
  <AppBar color='primary' sx={{position:'sticky',padding:'0 10px'}} id='header'>
    <Toolbar disableGutters>
      <Box sx={{display:{sm:'block',md:'none'}}}>
        <IconButton onClick={openDrawer}>
          <MenuIcon/>
        </IconButton>
      </Box>
      <Typography 
        component='a' 
        href='#' 
        sx={{flexGrow:1}}>
      CHATAPP
      </Typography>
      <Box sx={{display:{xs:'none',md:'block'}}}>
        <Button>about</Button>
      </Box>
      <Box sx={{display:{xs:'none',md:'block'}}}>
        <Button>contact</Button>
      </Box>
      <Box sx={{display:{xs:'none',md:'block'}}}>
        <Button focusRipple>home</Button>
      </Box>
      <Box sx={{display:{xs:'none',md:'block'}}}>
      <Box onClick={openMenu}>
          <Avatar srcSet={`http://127.0.0.1:8000${user.profile}`} sx={{width:30,height:30}}/>
      </Box>
      </Box>
      <Menu open={menuState} 
            anchorEl={anchorEl} 
            onClose={closeMenu}>
        <MenuItem component={Button} 
                  startIcon={<LogoutIcon/>}
                  onClick={() => navigate('logout')} >
                  logout
        </MenuItem>
      </Menu>
      
      <Drawer open={drawerOpen} 
              anchor='left' 
              onClose={toggleDrawer}>
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate('/')}>
              <ListItemIcon>
                <HomeIcon color='primary'/>
              </ListItemIcon>
              <ListItemText primary='home'/>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding >
            <ListItemButton>
              <ListItemIcon>
                <InfoIcon color='primary'/>
              </ListItemIcon>
              <ListItemText primary='about'/>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding >
            <ListItemButton>
              <ListItemIcon>
                <AddIcCallIcon color='primary'/>
              </ListItemIcon>
              <ListItemText primary='contacts'/>
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate('logout')}>
              <ListItemIcon>
                <LogoutIcon color='error' />
              </ListItemIcon>
              <ListItemText primary='logout' color='danger'/>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <Typography variant='subtitle2' color={'primary'}>© 2024 | briansaulan</Typography>
          </ListItem>
        </List>
      </Drawer>
    </Toolbar>
  </AppBar>
  )
}
