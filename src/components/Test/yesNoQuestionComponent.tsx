import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { YesNoAnswer, IQuestion } from "../../questions/test";
import Alert from "@material-ui/lab/Alert";

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
    width: "50%",
    justifyContent: "flex-end",
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
    if (
      props.question.answeredCorrectly === null
    ) {
      return <></>;
    } else if (props.question.answeredCorrectly === true) {
      return (
        <Alert severity="success">
          <Typography variant="body2">Wspaniale</Typography>
        </Alert>
      );
    } else {
      return (
        <Alert severity="error">
          <Typography variant="body2">Przykro nam</Typography>
        </Alert>
      );
    }
  }
  return (
    <>
      <div className={classes.question}>
        <Typography>{props.question.text}</Typography>
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
            {props.question.notAbblicableAvailable && (
              <Button
                variant={
                  props.question.answer === "NotApplicable" ? "contained" : "outlined"
                }
                color="primary"
                onClick={() => onAnswer("NotApplicable")}
              >
                NIE DOTYCZY
              </Button>
            )}
          </div>
          <div className={classes.result}>{questionResult()}</div>
        </div>
      </div>
    </>
  );
};

export default YesNoQuestionComponent;
