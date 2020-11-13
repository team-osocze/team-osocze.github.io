import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import CenterCard from './CenterCard';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    successResult: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }),
);

export default function SuccessResult() {
    const classes = useStyles();
    
    return (
        <div className={classes.successResult}>            
            <Alert severity="warning">
                <AlertTitle>Może się udać.</AlertTitle>
                <Typography variant="body1" gutterBottom>
                Jest duża szansa, że Twoje osocze może uratować komuś życie! Kilka odpowiedzi na pytania wymaga jednak konsultacji ze specjalistą.
                </Typography>                
                </Alert>
                <Typography variant="body1" gutterBottom>
                  Zadzwoń, by przejść przez kwestionariusz z osobą, która będzie mogła rozwiać wszelkie wątpliwości.<br/>
                  Pamiętaj! Linie mogą być obciążone i być może trzeba będzie czekać na połączenie.<br/>
                  <strong>Nie poddawaj się!</strong> 
                </Typography>
                <CenterCard />
                <Typography variant="body1" gutterBottom>
                  Udostęnij link do tej strony jak największej liczbie osób - być może wśród Twoich znajomych są potencjalni dawcy osocza.<br/>
                  Razem uratujemy więcej ludzkich żyć!
                </Typography>
        </div>
    );
}