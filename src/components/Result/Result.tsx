import React from "react";
import SuccessResult from "./SuccessResult";
import ErrorResult from "./ErrorResult";
import WarningResult from "./WarningResult";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { TestResult } from "../../questions/testDefinition";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      padding: "0 16px",
      flex: 1,
    },
    header: {
      marginTop: "16px",
      marginBottom: "8px",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
  })
);

interface ResultProps {
  result: TestResult;
  resultAdditionalMessages: string[];
  backToTestCallback: () => void;
}

export default function Result({
  result,
  resultAdditionalMessages: resultAdditionalMessage,
  backToTestCallback,
}: ResultProps) {

  const classes = useStyles();

  const resultSuccessMessages = ["Zakażenie COVID-19 potwierdzone wymazem.", "Obecność przeciwciał CoV-2 potwierdzona testem.", "Objawy typowe dla COVID-19 i kontakt z osobą zakażoną."]; //ug: proper info should come from test

  return (
    <>
      <div className={classes.content}>
        <header className={classes.header}>
          <Typography variant="h4" gutterBottom>
            Wynik
          </Typography>
          <Button
            component={Link}
            to="test"
            size="large"
            variant="contained"
            color="primary"
            onClick={backToTestCallback}
          >
            Wróć do testu
          </Button>
        </header>
        <div>
          {result === "Success" ? (
            <SuccessResult resultMessages={resultAdditionalMessage} resultSuccessMessages={resultSuccessMessages} />
          ) : null}
          {result === "Error" ? (
            <ErrorResult resultMessages={resultAdditionalMessage}/>
          ) : null}
          {result === "Warning" ? (
            <WarningResult resultMessages={resultAdditionalMessage} resultSuccessMessages={resultSuccessMessages}/>
          ) : null}
        </div>
      </div>
    </>
  );
}
