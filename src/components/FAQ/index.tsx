import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import FAQQuestionComponent from "./question";
import faqQuestions from "./questions.json";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

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
    testStartSection: {
        width: "100%",
        marginTop: "10px",
        padding: "5px",
        display: "flex",
        justifyContent: "center"
    }
  }));

const FAQComponent: React.FC = function() {
    const classes = useStyles();
    const [expandedGroup, setExpandedGroup] = React.useState<typeof faqQuestions[0] | null>(null);
    const [questions] = React.useState<typeof faqQuestions>(faqQuestions);

    function toggleGroup(group: typeof faqQuestions[0]) {
        setExpandedGroup((previouslyExpandedGroup) =>
            previouslyExpandedGroup !== group ? group : null
        );
    }

    return (
          <div className={classes.content}> 
            <header className={classes.header}>     
              <Typography variant="h5">FAQ - Najczęściej zadawane pytania</Typography>
            </header>           
            <div className={classes.groupsList}>
              {questions.map((group: typeof faqQuestions[0], index: number) => (
                <FAQQuestionComponent
                  expanded={expandedGroup === group}
                  isLastGroup={index === questions.length - 1}
                  onToggleGroup={() => toggleGroup(group)}
                  question={group.question}
                  answer={group.answer}
                  key={index} 
                />
              ))}
            </div>
            <section className={classes.testStartSection}>
              <Button component={Link} to="test" size="large" variant="contained" color="primary">Test</Button>
            </section>
          </div>
      );
};

export default FAQComponent;