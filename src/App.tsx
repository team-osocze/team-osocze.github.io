import React from 'react';
import AppBar from "./components/AppBar";
import Result from "./components/Result/Result";
import FAQComponent from "./components/FAQ";
import BottomNavigation from "./components/BottomNavigation";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { createStyles, makeStyles, Theme, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import TestComponent from "./components/Test";
import Container from '@material-ui/core/Container';
import { LandingPage } from "./components/Landing/LandingPage";

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

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#393070', //granatowy
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#B2D4DC', //szary
      contrastText: '#000000'
    },
    error: {
      main: '#EB5F5E'
    },
    warning: {
      main: '#DEC97A'
    },
    info: {
      main: '#59A9DE'
    },
    success: {
      main: '#4EDEC9'
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  typography: {
    fontFamily: [
      'Roboto',
      'Noto Serif',
      'serif'
    ].join(','),
  },
});

type ResultStates = React.ComponentProps<typeof Result>["result"];

function App() {
  const classes = useStyles();
  const [completionState, setCompletionState] = React.useState<ResultStates | null>(null);

  const setResultState = (result: ResultStates) => {
    setCompletionState(result);
  }

  return (
    <Router>
      <Container maxWidth="sm" style={{ padding: 0 }}>
        <ThemeProvider theme={theme}>
          <div className={classes.app}>
            <AppBar showResultOption={!!completionState} />
            <Switch>
              <Route exact path="/">
                <LandingPage />
              </Route>
              <Route path="/test">
                  <div className={classes.content}>
                    <TestComponent onResultChange={setResultState} />
                  </div>
              </Route>
              {completionState && <Route path="/result">
                  <div className={classes.content}>
                    <Result result={completionState} />
                  </div>
              </Route>}
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
