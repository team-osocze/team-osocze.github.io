import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import ReplayIcon from "@material-ui/icons/Replay";
import Alert from "@material-ui/lab/Alert";
import QuestionGroupComponent from "./questionGroup";
import { Test } from "../../questions/test";
import { IQuestionGroup } from "../../questions/questionGroup";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
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
    marginTop: "30px",
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

const test = new Test();

const TestComponent: React.FC = () => {
  const classes = useStyles();
  const [
    expandedGroup,
    setExpandedGroup,
  ] = React.useState<IQuestionGroup | null>(null);

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
      <div className={classes.root}>
        <header className={classes.header}>
          <h1>Test</h1>
          <Button variant="contained" onClick={(e) => restart()}>
            <ReplayIcon />
            POWTÓRZ
          </Button>
        </header>
        <Alert severity="info">
          Informacje nie są zbierane ani przekazywane. Tylko Ty je widzisz i
          masz do nich dostęp.
        </Alert>
        <div className={classes.groupsList}>
          {test.questionGroups.map((group: IQuestionGroup, index: number) => (
            <QuestionGroupComponent
              expanded={expandedGroup === group}
              isLastGroup={index === test.questionGroups.length - 1}
              onToggleGroup={() => toggleGroup(group)}
              onNext={() => openNextGroup()}
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
