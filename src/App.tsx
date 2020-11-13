import React from 'react';
import AppBar from "./components/AppBar";
import Result from "./components/Result/Result";
import BottomNavigation from "./components/BottomNavigation";
import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TestComponent from "./components/Test";

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
    <Router>
      <div className={classes.app}>
        <Switch>
          <Route exact path="/">
            <>
            Nothing yet here, check paths:
            /test
            /result
            </>
          </Route>
          <Route path="/test">
            <>
              <AppBar />
              <div className={classes.content}>
                <TestComponent />
              </div>
              <BottomNavigation />
            </>

          </Route>
          <Route path="/result">
            <>
              <AppBar />
              <div className={classes.content}>
                <Result />
              </div>
              <BottomNavigation />
            </>

          </Route>
        </Switch>

      </div>
    </Router>

  );
}

export default App;
