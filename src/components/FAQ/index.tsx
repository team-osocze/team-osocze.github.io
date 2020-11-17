import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import FAQQuestionComponent from "./question";
import faqQuestions from "./questions.json";

const useStyles = makeStyles((theme) => ({
    content:{
      padding: "0 16px",
      flex: 1
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
      marginTop: "16px",
      marginBottom: "8px",
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

const FAQComponent: React.FC = function() {
    const classes = useStyles();
    const [expandedGroup, setExpandedGroup] = React.useState<typeof faqQuestions[0] | null>(null);
    const [questions] = React.useState<typeof faqQuestions>(faqQuestions);

    useEffect(() => {
        setExpandedGroup(questions[0]);
    }, [questions]);

    function toggleGroup(group: typeof faqQuestions[0]) {
        setExpandedGroup((previouslyExpandedGroup) =>
            previouslyExpandedGroup !== group ? group : null
        );
    }

    return (
          <div className={classes.content}>
            <header className={classes.header}>
              <Typography variant="h4">
                FAQ - Najczęściej zadawane pytania
              </Typography>
            </header>
            <div className={classes.groupsList}>
              {questions.map((group: typeof faqQuestions[0], index: number) => (
                <FAQQuestionComponent
                  expanded={expandedGroup === group}
                  isLastGroup={index === questions.length - 1}
                  onToggleGroup={() => toggleGroup(group)}
                  question={group.question}
                  answer={group.answer} 
                />
              ))}
            </div>
          </div>
      );
};

export default FAQComponent;