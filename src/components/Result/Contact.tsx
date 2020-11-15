import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ContactList from './ContactList';
import  Grid  from '@material-ui/core/Grid';
import logo from '../../logoRCKiK.png'


const Logo = function() {
  return <img src={logo} width="100%" alt="RCKiK w Krakowie logo" />;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    centerCard: {
      maxWidth: 600,
      padding: 4,
      margin: 'auto'
    }, 
    large: {
      width: '100%',
      
    },    
    centerCardHeader: {
      paddingBottom: 4,
      align: 'right'
    },
    centerCardContent:{
      paddingTop: 4,
    }
  }),
);

export default function Contact() {
  const classes = useStyles();

  return (
    <Card className={classes.centerCard}>
      <Grid container direction="row">
        <Grid item xs={5} >        
              <Logo />
        </Grid>
        <Grid item xs={7} >
        <CardHeader className={classes.centerCardHeader}    
          title="Regionalne Centrum Krwiodawstwa i Krwiolecznictwa w Krakowie"
        />    
        <CardContent className={classes.centerCardContent}>        
          <Typography variant="body2" component="p">
              <ContactList/>
          </Typography>
        </CardContent>   
        </Grid>
      </Grid>
    </Card>
  );
}
