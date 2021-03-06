import React, { useEffect, useRef } from "react";
import AppBar from "./components/AppBar";
import Result from "./components/Result/Result";
import FAQComponent from "./components/FAQ";
import BottomNavigation from "./components/BottomNavigation";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
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
import { CreatorsPage } from "./components/Creators/CreatorsPage";

import {
  appStateReducer,
  initialState,
  resetStateAction,
  answerQuestionAction,
} from "./appState";
import { AppContextProvider, ScrollInfo } from "./appContext";
import { Question, YesNoAnswer } from "./questions/testDefinition";

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
      overflowY: "scroll",
    },
  })
);

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#393070",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#AEA9BA",
    },
    error: {
      main: "#F88065",
    },
    warning: {
      main: "#FFBA5A",
    },
    info: {
      main: "#595685",
    },
    success: {
      main: "#5D9F65",
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
  const initialScrollState: ScrollInfo = {
    appliedPosition: 0,
    persistedPosition: 0,
  };

  const [testState, dispatch] = React.useReducer(appStateReducer, initialState);
  const [showInfo, setShowInfo] = React.useState(true);
  const [scrollState, setScrollState] = React.useState(initialScrollState);
  const [expandedGroupHeader, setExpandedGroupHeader] = React.useState<
    string | null
  >(testState.groups[0].header);

  const appContainerElement = useRef(null);

  const appContext = {
    showInfo,
    setShowInfo,
    scroll: scrollState,
    setScroll: setScrollState,
  };
  const testProps = {
    testState,
    onAnswer,
    onRestart,
    expandedGroup: expandedGroupHeader,
    setExpandedGroup: setExpandedGroupHeader,
  };
  const resultProps = {
    result: testState.result!,
    resultWarningAndErrorMessages:
      testState.resultWarningAndErrorMessages,
    resultSuccessMessages: testState.resultSuccessMessages,
    backToTestCallback: onBackToTest,
  };

  function onRestart() {
    dispatch(resetStateAction());
  }

  function onBackToTest() {
    setScrollState((prev) => ({
      ...prev,
      appliedPosition: prev.persistedPosition,
    }));
  }

  function onAnswer(question: Question, answer: YesNoAnswer) {
    const scrollPosition: number =
      (appContainerElement as any).current?.scrollTop ?? 0;
    setScrollState((prev) => ({ ...prev, persistedPosition: scrollPosition }));
    dispatch(answerQuestionAction(question, answer));
  }

  useEffect(() => {
    if ((appContainerElement as any)?.current !== null) {
      (appContainerElement as any).current.scrollTop =
        scrollState.appliedPosition;
    }
  }, [scrollState.appliedPosition]);

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
                    <AppContextProvider value={appContext}>
                      <TestComponent {...testProps} />
                    </AppContextProvider>
                  </div>
                </Route>
                {testState.isDone && (
                  <Route path="/result">
                    <div className={classes.content}>
                      <Result {...resultProps} />
                    </div>
                  </Route>
                )}
                <Route path="/faq">
                  <FAQComponent />
                </Route>
                <Route path="/tworcy">
                  <CreatorsPage />
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
