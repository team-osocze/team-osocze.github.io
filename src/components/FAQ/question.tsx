import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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
        whiteSpace: "pre-line"
    },
    footer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    question: {
        marginBottom: "40px",
        display: "flex",
        flexDirection: "column",
        textAlign: "left",
      },
}));

interface InfoGroupProps {
    isLastGroup: boolean;
    expanded: boolean;
    onToggleGroup: () => void;
    question: string,
    answer: string
}

const InfoComponent: React.FC<{questionText: string}> = (props: {questionText: string}) => {
    const classes = useStyles();
  
    return (
      <>
        <div className={classes.question}>
          <Typography>{props.questionText}</Typography>
        </div>
      </>
    );
  };

const FAQQuestionComponent: React.FC<InfoGroupProps> = (props: InfoGroupProps) => {
    const classes = useStyles();

    return (
        <>
            <Accordion expanded={props.expanded} onChange={() => props.onToggleGroup()}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={props.question + "-content"} id={props.question + "-header"}>
                    <Typography variant="h6" className={classes.secondaryHeading}>
                        {props.question}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.groupDetails}>
                    <InfoComponent questionText={props.answer} />
                </AccordionDetails>
            </Accordion>
        </>
    );
};

export default FAQQuestionComponent;
