import {
    List,
    ListItemText,
    ListItemIcon,
    ListItem,
    Typography,
    ListItemButton
} from '@mui/material'


export default function SearchResults({results,sx}){
    console.log(results)
    return (
        <List sx={{
            backgroundColor:'white',
            border:'1px solid rgb(250, 44, 131)',
            borderTop:0,
            ...sx}}>
            {
                results && results.map(res => {
                  return <ListItem disablePadding={true}>
                    <ListItemButton sx={{margin:0}}>
                        <Typography key={res.username} paragraph={true} color='primary'>{res.username}</Typography>
                    </ListItemButton>
                 </ListItem> 
                })
            }
        </List>
    )
}



{/* <List sx={{backgroundColor:'white', ...sx,border:'1px solid rgb(250, 44, 131)',
        borderTop:0}}>
        <ListItem>
            <Typography paragraph={true}color='primary' noWrap={true}>
                
             </Typography>
        </ListItem>
    </List> */}