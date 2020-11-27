import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";
import CenterCard from "./CenterCard";
import { Typography } from "@material-ui/core";
import Mailto from './Mailto';

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
  resultMessages: string[];
  resultSuccessMessages: string[];
}
export default function WarningResult({ resultMessages, resultSuccessMessages }: IWarningResultProps) {
  const classes = useStyles();

  return (
    <div className={classes.successResult}>
      <Alert severity="warning">
        <AlertTitle>Może się udać.</AlertTitle>
        <Typography variant="body1" gutterBottom>
          <p>
            Jest duża szansa, że Twoje osocze może uratować komuś życie! Kilka odpowiedzi na pytania wymaga jednak konsultacji ze specjalistą.
          </p>
          {resultMessages.map((m) => (
            <p>
              <strong>{m}</strong>
            </p>
          ))}
        </Typography>
      </Alert>
      <Mailto subject="Może, może... - Zgłoszenie z osocze-info" resultMessages={resultMessages} resultSuccessMessages={resultSuccessMessages}/>    
      <Typography variant="body1" gutterBottom>
      Pamiętaj! Pracujemy na pełnych obrotach, odpowiedź może nam zająć trochę czasu. Bądź cierpliwy.
      </Typography> 
      <CenterCard />
      <Typography variant="body1" gutterBottom>
        <strong>Udostępnij</strong> link do tej strony jak największej liczbie
        osób - być może wśród Twoich znajomych są potencjalni dawcy osocza.
        Razem możemy uratować niejedno ludzkie życie!
      </Typography>
    </div>
  );
}
