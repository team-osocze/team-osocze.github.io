import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import RCKiKAdressList from './ContactList';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    centerCard: {
      maxWidth: 354,
      padding: 4
    },
    avatar: {
      backgroundColor: red[500],
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
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }        
        title="RCKiK"
        subheader="Regionalne Centrum Krwiodawstwa i Krwiolecznictwa w Krakowie"
      />     
      <CardContent className={classes.centerCardContent}>
        <Typography variant="body2" color="textSecondary" component="p">
            <RCKiKAdressList/>
        </Typography>
      </CardContent>   
    </Card>
  );
}
