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
import ClearIcon from "@material-ui/icons/Clear";
import { IQuestionGroup } from "../../appState";

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
  isExpanded: (header: string) => boolean;
  onToggleGroup: (header: string) => void;
  onNext?: () => void;
  children?: JSX.Element | JSX.Element[];
  header: string;
  group?: IQuestionGroup;
}

const QuestionGroupComponent: React.FC<IQuestionGroupProps> = (
  props: IQuestionGroupProps
) => {
  const classes = useStyles();

  function groupStatus() {
    const allQuestionsCorrect = props.group?.allQuestionsCorrect;
    if (allQuestionsCorrect === null) {
      return <></>;
    } else if (allQuestionsCorrect === false) {
      return <ClearIcon className={classes.red} />;
    } else {
      return <DoneIcon className={classes.green} />;
    }
  }

  return (
    <>
      <Accordion
        expanded={props.isExpanded(props.header)}
        onChange={() => props.onToggleGroup(props.header)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={props.header + "-content"}
          id={props.header + "-header"}
        >
          <div className={classes.heading}>{groupStatus()}</div>
          <Typography variant="h6" className={classes.secondaryHeading}>
            {props.header}
          </Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.groupDetails}>
          {props.children}
          <div className={classes.footer}>
            {!props.isLastGroup && (
              <Button
                variant="contained"
                color="secondary"
                onClick={() => props.onNext!()}
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
