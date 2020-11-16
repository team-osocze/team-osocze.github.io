import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import {
  YesNoAnswer,
  YesNoQuestion,
  IQuestion,
} from "../../questions/questionGroup";
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
  question: YesNoQuestion;
  onAnswer: (question: IQuestion, isCorrect: boolean | null) => void;
}

const YesNoQuestionComponent: React.FC<IYesNoQuestionProps> = (
  props: IYesNoQuestionProps
) => {
  const classes = useStyles();
  const [answer, setAnswer] = React.useState<YesNoAnswer | null>(
    props.question.getAnswer()
  );

  function onAnswer(answer: YesNoAnswer) {
    setAnswer(answer);
    props.question.setAnswer(answer);
    props.onAnswer(props.question, props.question.getResult());
  }

  function questionResult() {
    if (answer === null) return <></>;

    if (props.question.getResult())
      return (
        <Alert severity="success">
          <Typography variant="body2">Wspaniale</Typography>
        </Alert>
      );

    return (
      <Alert severity="error">
        <Typography variant="body2">Przykro nam</Typography>
      </Alert>
    );
  }
  return (
    <>
      <div className={classes.question}>
        <Typography>{props.question.text}</Typography>
        <div className={classes.answer}>
          <div className={classes.anserwButtons}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => onAnswer(YesNoAnswer.Yes)}
            >
              TAK
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => onAnswer(YesNoAnswer.No)}
            >
              NIE
            </Button>
            {props.question.getCanBeNotApplicable() && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => onAnswer(YesNoAnswer.NotApplicable)}
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
