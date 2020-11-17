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
import { LandingPage } from "./components/Landing/LandingPage";

import {
  ITest,
  testState as initialTestState,
  IQuestion,
  YesNoAnswer,
  IQuestionGroup,
  createTestState,
} from "./questions/test";

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

  const [testState, setTest] = React.useState<ITest>(initialTestState);

  function onAnswer(question: IQuestion, answer: YesNoAnswer) {
    setTest((previous) => {
      const groups: IQuestionGroup[] = [];

      for (const g of previous.groups) {
        if (containsQuestion(g, question)) {
          const questions: IQuestion[] = [];
          for (const q of g.questions) {
            if (q.text === question.text) {
              questions.push({
                type: q.type,
                text: q.text,
                notAbblicableAvailable: q.notAbblicableAvailable,
                correctAnswer: q.correctAnswer,
                answer: answer,
                answeredCorrectly: q.correctAnswer === answer,
              });
            } else {
              questions.push(q);
            }
          }
          groups.push({
            header: g.header,
            questions: questions,
            allQuestionsCorrect: questions.some((q) => q.answer === null)
              ? null
              : questions.every((q) => q.answeredCorrectly === true),
          });
        } else {
          groups.push(g);
        }
      }
      const answeredQuestions = groups
        .flatMap((g) => g.questions)
        .filter((q) => q.answer !== null);

      return {
        groups: groups,
        numberOfAllQuestions: previous.numberOfAllQuestions,
        numberOfAnsweredQuestions: answeredQuestions.length,
        isDone:
          previous.numberOfAllQuestions === answeredQuestions.length ||
          answeredQuestions.some((q) => q.answeredCorrectly === false),
        testResult: groups.every((g) => g.allQuestionsCorrect)
          ? "Success"
          : "Error",
      };
    });

    function containsQuestion(group: IQuestionGroup, question: IQuestion) {
      return group.questions.some((q) => q.text === question.text);
    }
  }

  function onRestart() {
    setTest(() => createTestState());
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
                    onAnswer={onAnswer}
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
