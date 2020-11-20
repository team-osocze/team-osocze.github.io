import React, { useEffect, useRef } from "react";
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

import {appStateReducer, initialState, resetStateAction, answerQuestionAction } from "./appState";
import { AppContextProvider, ScrollInfo } from "./appContext";
import { IQuestion, YesNoAnswer } from "./questions/test";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    app: {
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
    test: {
      overflowY: "scroll"
    }
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
  const initialScrollState: ScrollInfo = { position: 0, applyScroll: Symbol()};

  const [testState, dispatch] = React.useReducer(appStateReducer, initialState);
  const [showInfo, setShowInfo] = React.useState(true);
  const [scrollState, setScrollState] = React.useState(initialScrollState);
  const appContainerElement = useRef(null);

  function onRestart() {
    dispatch(resetStateAction());
  }

  function onBackToTest() {
    setScrollState(prev => ({...prev, applyScroll: Symbol()}))
  }

  function onAnswer(question: IQuestion, answer: YesNoAnswer) {
      const scrollPosition: number = (appContainerElement as any).current?.scrollTop ?? 0;
      setScrollState(prev => ({...prev, position: scrollPosition}))
      dispatch(answerQuestionAction(question, answer));
  }

  useEffect(() => {
    if ((appContainerElement as any)?.current !== null) {
      (appContainerElement as any).current.scrollTop = scrollState.position;
    }
  }, [scrollState.applyScroll]);

  return (
    <div ref={appContainerElement} className={classes.test}>
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
                  <AppContextProvider value={ {showInfo: showInfo, setShowInfo: setShowInfo, scroll: scrollState, setScroll: setScrollState}}>
                    <TestComponent testState={testState} onAnswer={onAnswer} onRestart={onRestart} />
                  </AppContextProvider>
                </div>
              </Route>
              {testState.isDone && (
                <Route path="/result">
                  <div className={classes.content}>
                    <Result result={testState.testResult!} backToTestCallback={onBackToTest} />
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
    </div>
  );
}

export default App;
