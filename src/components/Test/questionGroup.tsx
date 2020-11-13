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
import { IQuestion, IQuestionGroup, YesNoQuestion } from "../../questions/questionGroup";
import YesNoQuestionComponent from "./yesNoQuestionComponent";

const useStyles = makeStyles((theme) => ({
  heading: {
    flexBasis: "33.33%",
    flexShrink: 0,
    color: "green",
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  groupDetails: {
    flexDirection: "column",
  },
  footer:{
    display: "flex",
    flexDirection: "column",
    alignItems:"center"
  }
}));

interface QuestionGroupProps {
  isLastGroup: boolean;
  expanded: boolean;
  onToggleGroup: () => void;
  onNext: () => void;
  group: IQuestionGroup;
}

const QuestionGroupComponent: React.FC<QuestionGroupProps> = (
  props: QuestionGroupProps
) => {
  const classes = useStyles();

  function renderQuestion(q: IQuestion) {
    if (q instanceof YesNoQuestion) {
      return (
        <YesNoQuestionComponent
          text={q.text}
          onAnswer={(e) => alert(e)}
        />
      );
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
          <DoneIcon className={classes.heading} />
          <Typography className={classes.secondaryHeading}>
            {props.group.header}
          </Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.groupDetails}>
          {props.group.questions.map((q) => renderQuestion(q))}
          <div className={classes.footer}>
            {!props.isLastGroup ? (
              <Button variant="contained" onClick={() => props.onNext()}>
                DALEJ
              </Button>
            ) : (
              <Button variant="contained" onClick={() => {}}>
                REZULTAT
              </Button>
            )}
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default QuestionGroupComponent;
