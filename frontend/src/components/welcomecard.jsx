import { Card,Typography} from '@mui/material';

const styles = {
  card:{
    alignItems:'center',
    justifyContent:'center',
    flexGrow:1
  }
}

function WelcomeCard({sx}){

  return <Card sx={{...styles.card,...sx}} raise="true">
  <Typography variant='h6'>welcome nigga</Typography>
  </Card>
}

export default WelcomeCard;