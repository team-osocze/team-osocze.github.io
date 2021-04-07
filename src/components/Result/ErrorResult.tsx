import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Typography } from "@material-ui/core";
import { ShareActions } from "../shareActions";
import {appInsights} from "../../AppInsights";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    successResult: {
      width: "100%",
      "& > * + *": {
        marginTop: theme.spacing(2),
      },
    },
    shareActionsContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      padding: "0 50px;",
    },
  })
);
interface IErrorResultProps {
  resultWarningAndErrorMessages: string[];
}

export default function ErrorResult({
  resultWarningAndErrorMessages
}: IErrorResultProps) {
  const classes = useStyles();
  appInsights.trackEvent({name: "ErrorResult"});
  return (
    <div className={classes.successResult}>
      <Alert severity="error">
        <AlertTitle>Przykro nam.</AlertTitle>
        <Typography variant="body1" gutterBottom>
        Dziękujemy za wypełnienie ankiety. Niestety, w tym momencie nie możesz zostać dawcą osocza.         
        {resultWarningAndErrorMessages.map((m, i) => (
            <p key={i}>
              <strong>{m}</strong>
            </p>
          ))}
        </Typography>
      </Alert>
      <Typography variant="body1" gutterBottom>
        Ciągle jednak możesz zrobić coś dobrego, co pomoże innym.
        <br /> <strong>Udostępnij</strong> link do tej strony jak największej
        liczbie osób - być może wśród Twoich znajomych są potencjalni dawcy
        osocza. Razem możemy uratować niejedno ludzkie życie!
      </Typography>
      <div className={classes.shareActionsContainer}>
        <ShareActions />
      </div>
    </div>
  );
}
