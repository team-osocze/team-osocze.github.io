import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Typography } from "@material-ui/core";
import { ShareActions } from "../shareActions";

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
  resultMessage: string;
}
export default function ErrorResult({ resultMessage }: IErrorResultProps) {
  const classes = useStyles();

  return (
    <div className={classes.successResult}>
      <Alert severity="error">
        <AlertTitle>Przykro nam.</AlertTitle>
        <Typography variant="body1" gutterBottom>
          Dziękujemy za wypełnienie kwestionariusza. Niestety, wygląda na to, że
          w tym momencie nie możesz zostać dawcą osocza.
          <p>
            <strong>{resultMessage}</strong>
          </p>
        </Typography>
      </Alert>
      <Typography variant="body1" gutterBottom>
        Ciągle jednak możesz zrobić coś, co pomoże innym.
        <br /> <strong>Udostępnij</strong> link do tej strony jak największej
        liczbie osób - być może wśród Twoich znajomych są potencjalni dawcy
        osocza.
        <br />
        Razem uratujemy więcej ludzkich żyć!
      </Typography>
      <div className={classes.shareActionsContainer}>
        <ShareActions />
      </div>
    </div>
  );
}
