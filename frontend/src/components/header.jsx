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
import CustomDrawer from '../components/customdrawer.jsx'

import { styled } from '@mui/material/styles'

import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';

import { Link, useNavigate } from 'react-router-dom'
import { useUserContext } from '../context/usercontext.jsx'

import './static/header.css'

import { useState } from 'react'


const StyledBox = styled(Box)(({theme}) => ({
  [theme.breakpoints.down('md')]:{
    display:'none'
  },
  [theme.breakpoints.up('md')]:{
    display:'block'
  }
}))


const NavigationButton = ({to,label}) => {
  const navigate = useNavigate()
  return (
  <StyledBox component={Button} onClick={() => navigate(to)}>
    { label }
  </StyledBox>
  )
}


export default function Header(display){
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
  <AppBar color='primary' sx={{position:'sticky',padding:'0 10px',}} id='header'>
    <Toolbar disableGutters>
      <Box sx={{display:{sm:'block',md:'none'}}}>
        <IconButton onClick={openDrawer}>
          <MenuIcon/>
        </IconButton>
      </Box>
      <Typography sx={{flexGrow:1}}>CHATAPP</Typography>
      <NavigationButton to='/' label='home' />
      <NavigationButton to='/about' label='about' />
      <NavigationButton to='/contacts' label='contacts' />
      <StyledBox onClick={openMenu}>
        <Avatar srcSet={`http://127.0.0.1:8000${user.profile}`}       sx={{width:30,height:30}}/>
      </StyledBox>
      <Menu open={menuState} anchorEl={anchorEl} onClose={closeMenu}>
        <MenuItem component={Button} 
                  startIcon={<LogoutIcon/>}
                  onClick={() => navigate('logout')} >
                  logout
        </MenuItem>
      </Menu>
      
      <CustomDrawer open={drawerOpen} 
              anchor='left' 
              onClose={toggleDrawer} />
    </Toolbar>
  </AppBar>
  )
}
