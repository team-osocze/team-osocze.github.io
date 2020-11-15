import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TwitterIcon from '@material-ui/icons/Twitter';
import { Typography } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import EmailIcon from '@material-ui/icons/Email';
import ShareIcon from '@material-ui/icons/Share';

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    background: "lightgray"
  },
  icon: {
    padding: 5
  },
  bottomText: {
    marginRight: 15
  }
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();

  return (
    <div
      className={classes.root}
    >
      <Typography component="span" className={classes.bottomText}>Udostepnij:</Typography>
      <FacebookIcon className={classes.icon} color="primary"/>
      <TwitterIcon className={classes.icon} color="primary"/>
      <EmailIcon className={classes.icon} color="primary"/>
      <ShareIcon className={classes.icon} color="primary"/>
    </div>
  );
}
