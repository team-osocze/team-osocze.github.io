import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import CenterCard from './CenterCard';

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
                Jest duża szansa, że Twoje osocze może uratować komuś życie! Kilka odpowiedzi na pytania wymaga jednak konsultacji ze specjalistą.                
                </Alert>
                <p>Zadzwoń, by przejść przez kwestionariusz z osobą, która będzie mogła rozwiać wszelkie wątpliwości.</p>
                <p>Pamiętaj! Linie mogą być obciążone i być może trzeba będzie czekać na połączenie. <strong> Nie poddawaj się!</strong></p> 
                <CenterCard />
                <p> Udostęnij link do tej strony jak największej liczbie osób - być może wśród Twoich znajomych są potencjalni dawcy osocza.</p>
                <p> Razem uratujemy więcej ludzkich żyć!</p>
        </div>
    );
}