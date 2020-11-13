import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ContactList from './ContactList';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    centerCard: {
      maxWidth: 354,
      padding: 4
    }, 
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },    
    centerCardHeader: {
      paddingBottom: 4,
    },
    centerCardContent:{
      paddingTop: 4
    }
  }),
);

export default function CenterCard() {
  const classes = useStyles();

  return (
    <Card className={classes.centerCard}>
      <CardHeader className={classes.centerCardHeader}
        avatar={
          <Avatar aria-label="RCKiK" className={classes.large} alt="RCKiK" src="./logoRCKiK.jpg">          
          </Avatar>
        }        
        title="Regionalne Centrum Krwiodawstwa i Krwiolecznictwa w Krakowie"
      />    
      <CardContent className={classes.centerCardContent}>        
        <Typography variant="body2" component="p">
            <ContactList/>
        </Typography>
      </CardContent>   
    </Card>
  );
}
