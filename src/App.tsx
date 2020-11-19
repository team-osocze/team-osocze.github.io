import React from "react";
import AppBar from "./components/AppBar";
import Result from "./components/Result/Result";
import FAQComponent from "./components/FAQ";
import BottomNavigation from "./components/BottomNavigation";
import {
  HashRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import {
  createStyles,
  makeStyles,
  Theme,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import TestComponent from "./components/Test";
import Container from "@material-ui/core/Container";
import { LandingPage } from "./components/Landing/Page";

import {appStateReducer, initialState, resetStateAction, answerQuestionAction} from "./appState";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    app: {
      //textAlign: "center",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
    },
    content: {
      flex: 1,
    },
    container: {
      padding: 0,
    },
  })
);

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#393070", //granatowy
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#B2D4DC", //szary
      contrastText: "#000000",
    },
    error: {
      main: "#EB5F5E",
    },
    warning: {
      main: "#DEC97A",
    },
    info: {
      main: "#59A9DE",
    },
    success: {
      main: "#4EDEC9",
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  typography: {
    fontFamily: ["Roboto", "Noto Serif", "serif"].join(","),
  },
});

function App() {
  const classes = useStyles();

  const [testState, dispatch] = React.useReducer(appStateReducer, initialState);

  function onRestart() {
    dispatch(resetStateAction());
  }

  return (
    <Router>
      <Container maxWidth="sm" className={classes.container}>
        <ThemeProvider theme={theme}>
          <div className={classes.app}>
            <AppBar showResultOption={!!testState.isDone} />
            <Switch>
              <Route exact path="/">
                <LandingPage />
              </Route>
              <Route path="/test">
                <div className={classes.content}>
                  <TestComponent
                    testState={testState}
                    onAnswer={(question, answer) => { dispatch(answerQuestionAction(question, answer)); }}
                    onRestart={onRestart}
                  />
                </div>
              </Route>
              {testState.isDone && (
                <Route path="/result">
                  <div className={classes.content}>
                    <Result result={testState.testResult!} />
                  </div>
                </Route>
              )}
              <Route path="/faq">
                <FAQComponent />
              </Route>
              <Route path="*">
                <LandingPage />
              </Route>
            </Switch>
            <BottomNavigation />
          </div>
        </ThemeProvider>
      </Container>
    </Router>
  );
}

export default App;
