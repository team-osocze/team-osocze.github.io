import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";
import RCKiKCard from "./CenterCard";
import Typography from "@material-ui/core/Typography";
import { Language } from "@material-ui/icons";
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
  })
);

interface ISuccessResultProps {
  resultMessage: string;
}

export default function SuccessResult({ resultMessage }: ISuccessResultProps) {
  const classes = useStyles();

  return (
    <div className={classes.successResult}>
      <Alert severity="success">
        <AlertTitle>Wspaniale!</AlertTitle>
        <p>
          Wygląda na to, że Twoje osocze może uratować komuś życie! Zadzwoń,
          żeby by umówić się na oddanie osocza.
        </p>
        <p>
          <strong>{resultMessage}</strong>
        </p>
      </Alert>
      <Typography variant="body1" gutterBottom>
        Pamiętaj! Linie mogą być obciążone i być może koniecznym będzie
        poczekanie na połączenie.
        <br />
        <strong>Nie poddawaj się!</strong>
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
        <br />
        Razem uratujemy więcej ludzkich żyć!
      </Typography>
    </div>
  );
}
