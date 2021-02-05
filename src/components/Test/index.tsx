import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import ReplayIcon from "@material-ui/icons/Replay";
import Alert from "@material-ui/lab/Alert";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import QuestionGroupComponent from "./questionGroupComponent";
import {
  Test,
  QuestionGroup,
  Question,
  YesNoAnswer,
} from "../../questions/testDefinition";
import { Link, useHistory } from "react-router-dom";
import ProgressBar from "../progressBar";
import { useAppContext } from "../../appContext";
import { questionError } from "../../questions/testLogic";

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
  testState: Test;
  onAnswer: (question: Question, answer: YesNoAnswer) => void;
  onRestart: () => void;
  expandedGroup: string | null;
  setExpandedGroup: (groupToSet: string | null) => void;
}

const TestComponent: React.FC<TestComponentProps> = ({testState, onAnswer, onRestart, expandedGroup, setExpandedGroup}: TestComponentProps) => {
  const classes = useStyles();
  
  const { showInfo, setShowInfo, setScroll } = useAppContext();

  const history = useHistory();

  function toggleGroup(group: QuestionGroup) {
    const groupToSet = expandedGroup !== group.header ? group.header : null
    setExpandedGroup(groupToSet);
  }

  function openNextGroup() {
    setExpandedGroup(((previouslyExpandedGroupHeader: string | null) => {
      if (previouslyExpandedGroupHeader === null) {
        return testState.groups[0].header;
      } else {
        const nextGroupIndex =
          testState.groups.findIndex(g => g.header === previouslyExpandedGroupHeader) + 1;

        return nextGroupIndex < testState.groups.length
         ? testState.groups[nextGroupIndex].header
         : null;
      }
    })(expandedGroup));
  }

  function localOnAnswer(question: Question, answer: YesNoAnswer) {
    onAnswer(question, answer);
    if (questionError(question, answer)) {
      history.push("result");
    }
  }

  function restart() {
    onRestart();
    setExpandedGroup(testState.groups[0].header);
  }

  function onResult() {
    setScroll((prev) => ({ ...prev, persistedPosition: 0 }));
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
          <Alert
            severity="info"
            icon={<VisibilityOff fontSize="inherit" />}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setShowInfo(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            <Typography variant="body2">
              Informacje nie są zbierane ani przekazywane. Tylko Ty je widzisz i
              masz do nich dostęp.
            </Typography>
          </Alert>
        </Collapse>
        <div className={classes.groupsList}>
          {testState.groups.map((group: QuestionGroup, index: number) => (
            <QuestionGroupComponent
              expanded={expandedGroup === group.header}
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
              component={Link}
              to="result"
              onClick={onResult}
            >
              WYNIK
            </Button>            
          </div>
        </div>
      </div>
    </>
  );
};

export default TestComponent;
