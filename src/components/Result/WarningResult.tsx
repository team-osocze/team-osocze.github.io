import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";
import CenterCard from "./CenterCard";
import { Typography } from "@material-ui/core";
import Mailto from "./Mailto";
import CopyResult from "./CopyResult";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    successResult: {
      width: "100%",
      "& > * + *": {
        marginTop: theme.spacing(2),
      },
    },
  })
);
interface IWarningResultProps {
  resultWarningAndErrorMessages: string[];
  resultSuccessMessages: string[];
}
export default function WarningResult({
  resultWarningAndErrorMessages,
  resultSuccessMessages,
}: IWarningResultProps) {
  const classes = useStyles();
  return (
    <div className={classes.successResult}>
      <Alert severity="warning">
        <AlertTitle>Może się udać.</AlertTitle>
        <Typography variant="body1" gutterBottom>
          <p>
            Jest duża szansa, że Twoje osocze może uratować komuś życie! 
            <br/>Kilka odpowiedzi na pytania wymaga jednak konsultacji ze specjalistą.
          </p>
          {resultWarningAndErrorMessages.map((m) => (
            <p>
              <strong>{m}</strong>
            </p>
          ))}
        </Typography>
      </Alert>     
      <CenterCard />
      <Typography variant="body1" gutterBottom>
        <strong>Udostępnij</strong> link do tej strony jak największej liczbie
        osób - być może wśród Twoich znajomych są potencjalni dawcy osocza.
        Razem możemy uratować niejedno ludzkie życie!
      </Typography>
    </div>
  );
}
