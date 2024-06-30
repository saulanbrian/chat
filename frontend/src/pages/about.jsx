import React from "react";
import Header from "../components/header";

import {
    Box,
    Typography,
    Divider,
    List,
    ListItem,
    ListItemText,
    Link
} from '@mui/material'

import './static/about.css'
import ImageContainer from "../components/imagecontainer";

export default function About(){
    return (
    <React.Fragment>
        <Header />
        <Box id='about-main' sx={{overflow:'hidden'}} >
            <Box>
                <Typography variant='button' sx={{fontSize:'20px',postion:'relative'}}>
                        About chatapp
                </Typography>
                <Divider sx={{opacity:0.6}}/>
                <List>
                    <ListItem disableGutters>
                        <Typography paragraph>
                            this is a very responsive chat application made with the combined power of  
                                <Link href='https://react.dev/'> react-js </Link>and <Link href='https://www.djangoproject.com/'>python-django</Link>.
                                it is inspired by one of the most popular chat application named "messenger" developed by meta (the developers of facebook,ig,etc.)
                        </Typography>
                    </ListItem>
                    <ListItem disableGutters>
                        <Typography paragraph>
                            this application is created to showcase my skill as a full stack web developer. - Brian Saulan
                        </Typography>
                    </ListItem>
                    <ListItem disableGutters>
                        <Typography variant="button">
                            Features
                        </Typography>
                    </ListItem>
                </List>
            </Box>
            <Box>
                <Typography variant="button" fontSize={20}>App Preview on different screen size</Typography>
                <Divider opacity={0.6}/>
                <Typography variant="button" 
                            fontSize={20} 
                            sx={{marginTop:'15px'}}>
                    1. on desktop
                </Typography>
                <ImageContainer url="/static/images/Screenshot 2024-06-30 180759.png" />
                <Typography variant="button" 
                            fontSize={20} 
                            sx={{marginTop:'15px'}}>
                    2. on mobile
                </Typography>
                <Box id='mobile-box'>
                    <ImageContainer url="/static/images/Screenshot 2024-06-30 181947.png" />
                    <ImageContainer url="/static/images/Screenshot 2024-06-30 182024.png" />
                    <ImageContainer url='/static/images/Screenshot 2024-06-30 182039.png' />
                </Box>
            </Box>
        </Box>
    </React.Fragment>
    )
}