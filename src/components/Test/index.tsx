import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import ReplayIcon from "@material-ui/icons/Replay";
import Alert from "@material-ui/lab/Alert";
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import QuestionGroupComponent from "./questionGroupComponent";
import {
  ITest,
  IQuestionGroup,
  IQuestion,
  YesNoAnswer,
} from "../../questions/test";
import { useHistory } from "react-router-dom";
import ProgressBar from "../progressBar";

const useStyles = makeStyles((theme) => ({
  content: {
    padding: "0 16px",
    flex: 1,
  },
  heading: {
    flexBasis: "33.33%",
    flexShrink: 0,
    color: "green",
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  header: {
    marginTop: "16px",
    marginBottom: "8px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  groupDetails: {
    flexDirection: "column",
  },
  groupsList: {
    marginTop: "10px",
  },
  resultButtonContainer: {
    textAlign: "center",
    marginTop: "20px",
  },
}));

interface TestComponentProps {
  testState: ITest;
  onAnswer: (question: IQuestion, answer: YesNoAnswer) => void;
  onRestart: () => void;
}

const TestComponent: React.FC<TestComponentProps> = ({
  testState,
  onAnswer,
  onRestart,
}: TestComponentProps) => {
  const classes = useStyles();
  const [expandedGroupHeader, setExpandedGroupHeader] = React.useState<
    string | null
  >(testState.groups[0].header);
  const [showInfo, setShowInfo] = React.useState(true);

  const history = useHistory();

  function toggleGroup(group: IQuestionGroup) {
    setExpandedGroupHeader((previouslyExpandedGroupHeader) =>
      previouslyExpandedGroupHeader !== group.header ? group.header : null
    );
  }

  function openNextGroup() {
    setExpandedGroupHeader((previouslyExpandedGroupHeader) => {
      if (previouslyExpandedGroupHeader === null) {
        return testState.groups[0].header;
      } else {
        const nextGroupIndex =
          testState.groups.findIndex(
            (g) => g.header === previouslyExpandedGroupHeader
          ) + 1;

        if (nextGroupIndex < testState.groups.length)
          return testState.groups[nextGroupIndex].header;
        else return null;
      }
    });
  }

  function localOnAnswer(question: IQuestion, answer: YesNoAnswer) {
    onAnswer(question, answer);
    if (question.correctAnswer !== answer) history.push("result");
  }

  function restart() {
    onRestart();
    setExpandedGroupHeader(testState.groups[0].header);
    setShowInfo(true)
  }

  function showResult() {
    history.push("result");
  }

  return (
    <>
      <div className={classes.content}>
        <header className={classes.header}>
          <Typography variant="h4">Test</Typography>
          <ProgressBar
            answeredQuestions={testState.numberOfAnsweredQuestions}
            allQuestions={testState.numberOfAllQuestions}
          />

          <Button
            variant="contained"
            color="secondary"
            onClick={() => restart()}
          >
            <ReplayIcon />
            POWTÓRZ
          </Button>
        </header>
        <Collapse in={showInfo}>
          <Alert severity="info" 
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setShowInfo(false);
                      }}><CloseIcon fontSize="inherit" />
                    </IconButton>
          }>
          <Typography variant="body2">
            Informacje nie są zbierane ani przekazywane. Tylko Ty je widzisz i
            masz do nich dostęp.
          </Typography>
        </Alert>
        </Collapse>
        <div className={classes.groupsList}>
          {testState.groups.map((group: IQuestionGroup, index: number) => (
            <QuestionGroupComponent
              expanded={expandedGroupHeader === group.header}
              isLastGroup={index === testState.groups.length - 1}
              onToggleGroup={() => toggleGroup(group)}
              onNext={() => openNextGroup()}
              onAnswer={localOnAnswer}
              group={group}
              key={group.header}
            />
          ))}
          <div className={classes.resultButtonContainer}>
            <Button
              size="large"
              variant="contained"
              color="secondary"
              disabled={!testState.isDone}
              onClick={() => showResult()}
            >
              REZULTAT
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestComponent;
