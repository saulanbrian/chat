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

const styles = {
    box:{
        padding:'20px',
        display:'flex',
    },
   
}


export default function Contacts(){
    return (
    <React.Fragment>
        <Header />
        <h1>Contacts</h1>
    </React.Fragment>
    )
}