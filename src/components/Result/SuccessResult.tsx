import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";
import RCKiKCard from "./CenterCard";
import Typography from "@material-ui/core/Typography";
import { Language } from "@material-ui/icons";
import Mailto from "./Mailto";
import Button from "@material-ui/core/Button";
import CopyResult from "./CopyResult";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    successResult: {
      width: "100%",
      "& > * + *": {
        marginTop: theme.spacing(2),
      },
    },
    buttonLink: {
      marginTop: 0,
    },
    link: {
      "& > * + *": {
        marginLeft: theme.spacing(2),
      },
    },
    icon: {
      padding: 5,
    },
  })
);

interface ISuccessResultProps {
  resultWarningAndErrorMessages: string[];
  resultSuccessMessages: string[];
}

export default function SuccessResult({
  resultWarningAndErrorMessages,
  resultSuccessMessages,
}: ISuccessResultProps) {
  const classes = useStyles();

  return (
    <div className={classes.successResult}>
      <Alert severity="success" action={
          <CopyResult
            resultSuccessMessages={resultSuccessMessages}
            resultWarningAndErrorMessages={resultWarningAndErrorMessages}
          />
        }>
        <AlertTitle>Wspaniale!</AlertTitle>
        <p>
          Możliwe, że Twoje osocze uratuje komuś życie! Prosimy o wysłanie maila
          na adres <strong>osocze@rckik.pl</strong>. Oddzwonimy najwcześniej jak
          to tylko możliwe.
        </p>
        {resultWarningAndErrorMessages.map((m) => (
          <p>
            <strong>{m}</strong>
          </p>
        ))}
      </Alert>
      <Mailto
        subject="WSPANIALE - Zgłoszenie z osocze-info"
        resultWarningAndErrorMessages={resultWarningAndErrorMessages}
        resultSuccessMessages={resultSuccessMessages}
      />
      <Typography variant="body1" gutterBottom>
        Pamiętaj! Pracujemy na pełnych obrotach, odpowiedź może nam zająć trochę
        czasu. Bądź cierpliwy.
      </Typography>
      <RCKiKCard />
      <p></p>
      <Typography variant="body1" gutterBottom>
        Jeżeli do Krakowa masz za daleko, sprawdź jak oddać osocze w cenrum
        krwiodawstwa bliżej Ciebie. Lista centrów krwiodawstwa jest dostępna na
        stronie:
      </Typography>
      <Button
        component="a"
        className={classes.buttonLink}
        color="primary"
        variant="outlined"
        startIcon={<Language />}
        href="https://www.gov.pl/web/nck/centrakrwiodawstwa"
        target="_blank"
      >
        Narodowego Centrum Krwi
      </Button>
      <Typography variant="body1" gutterBottom>
        <strong>Udostępnij</strong> link do tej strony jak największej liczbie
        osób - być może wśród Twoich znajomych są potencjalni dawcy osocza.
        Razem możemy uratować niejedno ludzkie życie!
      </Typography>
    </div>
  );
}
