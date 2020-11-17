import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {ShareActions} from "./shareActions";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    background: "lightgray",
    marginTop: "10px"
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
      <ShareActions />
    </div>
  );
}
