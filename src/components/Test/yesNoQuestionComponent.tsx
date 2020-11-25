import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { YesNoAnswer, IQuestion } from "../../questions/testDefinition";
import Alert from "@material-ui/lab/Alert";
import DoneIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Clear";
import PriorityHigh from "@material-ui/icons/PriorityHigh";
import InfoDialog from "./infoDialog";

const useStyles = makeStyles((theme) => ({
  question: {
    marginBottom: "40px",
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
  },
  answer: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "row",
    height: "48px",
  },
  anserwButtons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "50%",
  },
  result: {
    width: "56px",
    justifyContent: "flex-end",
  },
  green: {
    color: "green",
  },
  red: {
    color: "red",
  },
}));

interface IYesNoQuestionProps {
  question: IQuestion;
  onAnswer: (question: IQuestion, answer: YesNoAnswer) => void;
}

const YesNoQuestionComponent: React.FC<IYesNoQuestionProps> = (
  props: IYesNoQuestionProps
) => {
  const classes = useStyles();

  function onAnswer(answer: YesNoAnswer) {
    props.onAnswer(props.question, answer);
  }

  function questionResult() {
    switch (props.question.result) {
      case null:
        return <></>;
      case "Error":
        return (
          <Alert icon={<ClearIcon fontSize="inherit" />} severity="error" />
        );
      case "Warning":
        return (
          <Alert
            icon={<PriorityHigh fontSize="inherit" />}
            severity="warning"
          />
        );
      case "Success":
        return (
          <Alert icon={<DoneIcon fontSize="inherit" />} severity="success" />
        );
    }
  }

  return (
    <>
      <div className={classes.question}>
        <Typography>
          {props.question.text}
          {!!props.question.info ? (
            <InfoDialog infoText={props.question.info} />
          ) : null}
        </Typography>
        <div className={classes.answer}>
          <div className={classes.anserwButtons}>
            <Button
              variant={
                props.question.answer === "Yes" ? "contained" : "outlined"
              }
              color="primary"
              onClick={() => onAnswer("Yes")}
            >
              TAK
            </Button>
            <Button
              variant={
                props.question.answer === "No" ? "contained" : "outlined"
              }
              color="primary"
              onClick={() => onAnswer("No")}
            >
              NIE
            </Button>
          </div>
          <div className={classes.result}>{questionResult()}</div>
        </div>
      </div>
    </>
  );
};

export default YesNoQuestionComponent;
