import React from 'react';
import AppBar from "./components/AppBar";
import Result from "./components/Result";
import BottomNavigation from "./components/BottomNavigation";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Test from "./components/Test";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        app: {
          //textAlign: "center",
          height: "100vh",
          display: "flex",
          flexDirection: "column"
        },
        content: {
          flex: 1
        }
    }),
);

function App() {
  const classes = useStyles();
  return (
    <div className={classes.app}>
      <AppBar />
      <div className={classes.content}>
        <Test/>
        <Result />
      </div>
      <BottomNavigation />
    </div>
  );
}

export default App;