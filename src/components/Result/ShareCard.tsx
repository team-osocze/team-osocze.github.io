import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import {Facebook, Twitter, Email, Share, Instagram} from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
    shareCard: {
      padding: 4,
      maxWidth: 345,
    },
    avatar: {
      backgroundColor: red[500],
    },
    shareCardHeader: {
      paddingBottom: 4,
    },
    shareCardContent:{
      paddingTop: 4
    }
  }),
);

export default function ShareCard() {
  const classes = useStyles();

  return (
    <Card className={classes.shareCard}>
      <CardHeader className={classes.shareCardHeader}
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            B
          </Avatar>
        }        
        title="Udostępnij!"
        subheader="W ten sposób najleiej nam pomożesz"
      />     
      <CardContent className={classes.shareCardContent}>
          <IconButton aria-label="Facebook" className={classes.button} ><Facebook/></IconButton >
          <IconButton aria-label="Email" className={classes.button} ><Email/></IconButton >
          <IconButton aria-label="Twitter" className={classes.button} ><Twitter/></IconButton >
          <IconButton aria-label="Instagram" className={classes.button} ><Instagram/></IconButton >
          <IconButton aria-label="Share" className={classes.button} ><Share/></IconButton >
      </CardContent>   
    </Card>
  );
}
