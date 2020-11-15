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
import {
  IQuestion,
  IQuestionGroup,
  YesNoQuestion,
} from "../../questions/questionGroup";
import YesNoQuestionComponent from "./yesNoQuestionComponent";

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

interface QuestionGroupProps {
  isLastGroup: boolean;
  expanded: boolean;
  onToggleGroup: () => void;
  onNext: () => void;
  group: IQuestionGroup;
  onShowResult: () => void;
}

const QuestionGroupComponent: React.FC<QuestionGroupProps> = (
  props: QuestionGroupProps
) => {
  const classes = useStyles();

  const [results, setResults] = React.useState<Map<IQuestion, boolean | null>>(
    new Map<IQuestion, boolean | null>(props.group.getAnswers())
  );

  function setQuestionResult(q: IQuestion, isCorrect: boolean | null) {
    setResults((prev) => {
      return new Map(prev.set(q, isCorrect));
    });

    if(!isCorrect){
      props.onShowResult();
    }
  }

  function renderQuestion(q: IQuestion) {
    if (q instanceof YesNoQuestion) {
      return (
        <YesNoQuestionComponent question={q} onAnswer={setQuestionResult} />
      );
    }
  }

  function groupStatus() {
    const answersArray = Array.from(results.values());
    if (answersArray.some((a) => a === null)) return <></>;

    if (answersArray.some((a) => a === false))
      return <ErrorIcon className={classes.red} />;
    else return <DoneIcon className={classes.green} />;
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
            {!props.isLastGroup ? (
              <Button
                variant="contained"
                color="secondary"
                onClick={() => props.onNext()}
              >
                DALEJ
              </Button>
            ) : (
              <Button variant="contained" color="secondary" onClick={()=> props.onShowResult()}>
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
