import {
    ListItem,
    TextField,
    IconButton, 
    Button,
    Box, 
    Input,
    Menu,
    MenuList,
    MenuItem
} from '@mui/material'

import SearchIcon from "@mui/icons-material/Search"
import SearchResults from './searchresults'

import React, { useEffect, useRef, useState } from 'react'
import useSearchUsers from '../queries/users'

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
    const [searchKey,setSearchKey] = useState(undefined)


    const {data,isErrors,isLoading,refetch,enabled} = useSearchUsers(searchKey);
    
    useEffect(() => {   

        const timeoutId = setTimeout(() => {
                setSearchKey(searchInput)
            },1000)


        return () => clearTimeout(timeoutId)

    },[searchInput])


    useEffect(() => {
        refetch()
    },[searchKey])


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
        data && data.length >= 1 && 
        <SearchResults sx={{position:'absolute', zIndex:'1',width:'70%',}} results={data} />
      }
    </React.Fragment>
    )
}