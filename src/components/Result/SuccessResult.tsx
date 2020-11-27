import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";
import RCKiKCard from "./CenterCard";
import Typography from "@material-ui/core/Typography";
import { Language } from "@material-ui/icons";
import Mailto from './Mailto';
import Button from "@material-ui/core/Button";

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
      padding: 5
    },
  })
);

interface ISuccessResultProps {
  resultMessages: string[];
}

export default function SuccessResult({ resultMessages }: ISuccessResultProps) {
  const classes = useStyles();
  return (
    <div className={classes.successResult}>
      <Alert severity="success">
        <AlertTitle>Wspaniale!</AlertTitle>
        <p>
          Możliwe, że Twoje osocze uratuje komuś życie! Prosimy o wysłanie maila na adres <strong>osocze@rckik.pl</strong>. Oddzwonimy najwcześniej jak to tylko możliwe.
        </p>
        {resultMessages.map((m) => (
          <p>
            <strong>{m}</strong>
          </p>
        ))}
      </Alert>
      <Mailto subject="WSPANIALE - Zgłoszenie z osocze-info" resultMessages={resultMessages}/>
      <Typography variant="body1" gutterBottom>
      Pamiętaj! Pracujemy na pełnych obrotach, odpowiedź może nam zająć trochę czasu. Bądź cierpliwy.
      </Typography>      
      <RCKiKCard />
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
