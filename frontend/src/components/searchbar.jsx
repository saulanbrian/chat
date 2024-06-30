import {
    ListItem,
    TextField,
    IconButton, 
    Button,
    Box, 
    Input,
    Menu,
    MenuList,
    MenuItem,
    Typography
} from '@mui/material'

import SearchIcon from "@mui/icons-material/Search"
import SearchResults from './searchresults'

import React, { useEffect, useRef, useState } from 'react'
import useSearchUsers from '../queries/users'

import CircularProgress from '@mui/material/CircularProgress';

const styles = {
    main:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
    },
    input:{
        flexGrow:1,
        borderRadius:'',
        maxWidth:'70%'
    },
}

export default function SearchBar({sx}){

    const [searchInput,setSearchInput] = useState('')
    const [searchKey,setSearchKey] = useState('')


    const {data,isErrors,isLoading,isSuccess,isPending} = useSearchUsers(searchKey);
    
    useEffect(() => {   

        const timeoutId = setTimeout(() => {
                setSearchKey(searchInput)
            },1000)


        return () => clearTimeout(timeoutId)

    },[searchInput])


    function handleChange(e){
        const key = e.target.value
        setSearchInput(key)
    }

    return (
    <React.Fragment>
      <ListItem sx={sx}> 
        <Input id='search-input' 
               value={searchInput}
               sx={styles.input}
               placeholder='search for user'
               color='primary'
               onChange={handleChange}/>
        <IconButton size='medium'  color='primary'>
            <SearchIcon />
        </IconButton>
      </ListItem>
      {
        isSuccess &&  data?.length >= 1 &&
        <SearchResults sx={{position:'absolute', zIndex:'1',width:'70%',}} results={data} /> 
      }
      {
        isSuccess && data?.error && 
        <Box sx={{position:'absolute', zIndex:'1',width:'70%',background:'white'}}>
           <Typography paragraph={true} sx={{paddingLeft:5}}>{data.error}</Typography>
        </Box>
      }
      {
        isLoading && 
        <Box sx={{
            position:'absolute', 
            zIndex:'1',
            width:'70%',
            background:'white',
            display:'flex',
            justifyContent:'center'
            }}>
            <CircularProgress size={30}/>
        </Box>
      }
    </React.Fragment>
    )
}