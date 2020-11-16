import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Facebook, Twitter, Email, Share, Instagram} from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(0.5),
    },
    shareCard: {
      padding: 4,
      maxWidth: 345,
    },
    avatar: {
      backgroundColor: theme.palette.primary.main,
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
      <>
          <Typography variant="body2" component="p">
            <Grid container spacing={3}>
              <Grid item xs={2}>
                <IconButton aria-label="Facebook" className={classes.button} color="primary"><Facebook/></IconButton >
              </Grid>
              <Grid item xs={2}>
                <IconButton aria-label="Email" className={classes.button} color="primary"><Email/></IconButton >
              </Grid>              
              <Grid item xs={2}>
                <IconButton aria-label="Twitter" className={classes.button} color="primary"><Twitter/></IconButton >
              </Grid>              
              <Grid item xs={2}>
                <IconButton aria-label="Instagram" className={classes.button} color="primary"><Instagram/></IconButton >
              </Grid>  
              <Grid item xs={2}>
                <IconButton aria-label="Share" className={classes.button} color="primary"><Share/></IconButton >
              </Grid>              
            </Grid>
          </Typography>
    </>
  );
}
