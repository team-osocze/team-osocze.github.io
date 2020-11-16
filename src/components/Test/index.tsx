import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import ReplayIcon from "@material-ui/icons/Replay";
import Alert from "@material-ui/lab/Alert";
import QuestionGroupComponent from "./questionGroup";
import { Test } from "../../questions/test";
import { IQuestionGroup } from "../../questions/questionGroup";
import { useHistory } from "react-router-dom";
import ProgressBar from "../progressBar";



const useStyles = makeStyles((theme) => ({
  content:{
    padding: "0 16px",
    flex: 1
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
}));

interface TestComponentProps {
  test?: Test;
  onResultChange: (result: "Success" | "Error" | "Warning") => void;
}

const TestComponent: React.FC<TestComponentProps> = (
  props: TestComponentProps
) => {
  const classes = useStyles();
  const [
    expandedGroup,
    setExpandedGroup,
  ] = React.useState<IQuestionGroup | null>(null);

  const history = useHistory();
  const [test] = React.useState<Test>(props.test ?? new Test());

  const [progress, setProgress] = React.useState<number>(0);

  useEffect(() => {
    setExpandedGroup(test.questionGroups[0]);
  }, [test]);

  function toggleGroup(group: IQuestionGroup) {
    setExpandedGroup((previouslyExpandedGroup) =>
      previouslyExpandedGroup !== group ? group : null
    );
  }

  function openNextGroup() {
    setExpandedGroup((previouslyExpandedGroup) => {
      if (previouslyExpandedGroup === null) {
        return test.questionGroups[0];
      } else {
        const nextGroupIndex =
          test.questionGroups.indexOf(previouslyExpandedGroup, 0) + 1;
        if (nextGroupIndex < test.questionGroups.length)
          return test.questionGroups[nextGroupIndex];
        else return null;
      }
    });
  }

  function restart() {
    setExpandedGroup(test.questionGroups[0]);
  }

  return (
    <>
      <div className={classes.content}>
        <header className={classes.header}>
          <Typography variant="h4">
            Test
          </Typography>
          <ProgressBar value={progress} />
          <Button
            variant="contained"
            color="secondary"
            onClick={(e) => restart()}            
          >
            <ReplayIcon />
            POWTÓRZ
          </Button>
        </header>
        <Alert severity="info">
          <Typography variant="body2">
            Informacje nie są zbierane ani przekazywane. Tylko Ty je widzisz i
            masz do nich dostęp.
          </Typography>
        </Alert>
        <div className={classes.groupsList}>
          {test.questionGroups.map((group: IQuestionGroup, index: number) => (
            <QuestionGroupComponent
              expanded={expandedGroup === group}
              isLastGroup={index === test.questionGroups.length - 1}
              onToggleGroup={() => toggleGroup(group)}
              onNext={() => openNextGroup()}
              onShowResult={() => { 
                props.onResultChange(test.getResult() ? "Success" : "Error");
                history.push("result");
              }}
              onAnswer={()=>setProgress(test.getProgress())}
              group={group}
              key={group.header}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default TestComponent;
