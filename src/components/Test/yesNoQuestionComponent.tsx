import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { YesNoAnswer } from "../../questions/questionGroup";

const useStyles = makeStyles((theme) => ({
  question: {
    marginBottom: "40px",
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
  },
  anserwButtons: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "50%",
  },
}));

interface IYesNoQuestionProps {
  text: string;
  onAnswer: (answer: YesNoAnswer) => void;
}


const YesNoQuestionComponent: React.FC<IYesNoQuestionProps> = (
  props: IYesNoQuestionProps
) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.question}>
        <Typography>{props.text}</Typography>
        <div className={classes.anserwButtons}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() =>
              props.onAnswer(YesNoAnswer.Yes)
            }
          >
            TAK
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              props.onAnswer(YesNoAnswer.No)
            }
          >
            NIE
          </Button>
        </div>
      </div>
    </>
  );
};

export default YesNoQuestionComponent;
