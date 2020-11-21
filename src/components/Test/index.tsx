import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import ReplayIcon from "@material-ui/icons/Replay";
import Alert from "@material-ui/lab/Alert";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import { Link, useHistory } from "react-router-dom";
import ProgressBar from "../progressBar";
import { useAppContext } from "../../appContext";
import GeneralQuestionsGroup from "./questions/general/group";
import CovidQuestionsGroup from "./questions/covid/group";

import { ITest } from "../../appState";
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
  onAnswer: (
    groupHeader: string,
    questionText: string,
    answeredCorrectly: boolean
  ) => void;
  onRestart: () => void;
  onGroupCreated: (groupHeader: string, questionsNumber: number) => void;
}

const TestComponent: React.FC<TestComponentProps> = ({
  testState,
  onAnswer,
  onRestart,
  onGroupCreated,
}: TestComponentProps) => {
  const classes = useStyles();
  const [expandedGroupHeader, setExpandedGroupHeader] = React.useState<
    string | null
  >("Ogólne");

  const { showInfo, setShowInfo, setScroll } = useAppContext();
  const history = useHistory();

  function toggleGroup(groupHeader: string) {
    setExpandedGroupHeader((previouslyExpandedGroupHeader: string | null) =>
      previouslyExpandedGroupHeader !== groupHeader ? groupHeader : null
    );
  }

  function localOnAnswer(
    groupHeader: string,
    questionText: string,
    answeredCorrectly: boolean
  ) {
    onAnswer(groupHeader, questionText, answeredCorrectly);
    if (!answeredCorrectly) history.push("result");
  }

  function restart() {
    onRestart();
    setExpandedGroupHeader(testState.groups[0].header);
  }

  function onResult() {
    setScroll((prev) => ({ ...prev, persistedPosition: 0 }));
  }

  function isExpanded(header: string) {
    return expandedGroupHeader === header;
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
          <GeneralQuestionsGroup
            isExpanded={isExpanded}
            isLastGroup={false}
            onToggleGroup={toggleGroup}
            onNext={() => setExpandedGroupHeader("Covid")}
            onAnswer={localOnAnswer}
            onGroupCreated={onGroupCreated}
            testState={testState}
          />
          <CovidQuestionsGroup
            isExpanded={isExpanded}
            isLastGroup={true}
            onToggleGroup={toggleGroup}
          />

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
              REZULTAT
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestComponent;
