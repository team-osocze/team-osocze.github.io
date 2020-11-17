import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DoneIcon from "@material-ui/icons/Done";
import ErrorIcon from "@material-ui/icons/Error";
import { IQuestion, IQuestionGroup, YesNoAnswer } from "../../questions/test";
import YesNoQuestionComponent from "./yesNoQuestionComponent";
import { group } from "console";

const useStyles = makeStyles((theme) => ({
  heading: {
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  green: {
    color: "green",
  },
  red: {
    color: "red",
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  groupDetails: {
    flexDirection: "column",
  },
  footer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

interface IQuestionGroupProps {
  isLastGroup: boolean;
  expanded: boolean;
  onToggleGroup: () => void;
  onNext: () => void;
  group: IQuestionGroup;
  onAnswer: (question: IQuestion, answer: YesNoAnswer) => void;
}

const QuestionGroupComponent: React.FC<IQuestionGroupProps> = (
  props: IQuestionGroupProps
) => {
  const classes = useStyles();

  function renderQuestion(q: IQuestion) {
    if (q.type === "YesNo")
      return <YesNoQuestionComponent question={q} onAnswer={props.onAnswer} />;
  }

  function groupStatus() {
    const allQuestionsCorrect = props.group.allQuestionsCorrect;
    if (allQuestionsCorrect === null) {
      return <></>;
    } else if (allQuestionsCorrect === false) {
      return <ErrorIcon className={classes.red} />;
    } else {
      return <DoneIcon className={classes.green} />;
    }
  }

  return (
    <>
      <Accordion
        expanded={props.expanded}
        onChange={() => props.onToggleGroup()}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={props.group.header + "-content"}
          id={props.group.header + "-header"}
        >
          <div className={classes.heading}>{groupStatus()}</div>
          <Typography variant="h6" className={classes.secondaryHeading}>
            {props.group.header}
          </Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.groupDetails}>
          {props.group.questions.map((q) => renderQuestion(q))}
          <div className={classes.footer}>
            {!props.isLastGroup && (
              <Button
                variant="contained"
                color="secondary"
                onClick={() => props.onNext()}
              >
                DALEJ
              </Button>
            )}
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default QuestionGroupComponent;
