import { Card,Typography} from '@mui/material'

const location = window.location.pathname

const styles = {
  card:{
    display:{
      xs: location === '/'? "none": "flex",
      md:"flex"
    },
    // minWidth:'65vw',
    alignItems:'center',
    justifyContent:'center',
    flexGrow:1
  }
}

function WelcomeCard(){

  return <Card sx={styles.card} raise="true">
  <Typography variant='h6'>welcome nigga</Typography>
  </Card>
}

export default WelcomeCard;