import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import RCKiKCard from './CenterCard';

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
            <Alert severity="success">
                <AlertTitle>Wspaniale!</AlertTitle>
                Wygląda na to, że Twoje osocze może uratować komuś życie! Zadzwoń żeby by umówić się na oddanie osocza.
                </Alert>
                <p>Pamiętaj! Linie mogą być obciążone i być może trzeba będzie czekać na połączenie. <strong> Nie poddawaj się!</strong></p> 
                <RCKiKCard />
                <p> Udostęnij link do tej strony jak największej liczbie osób - być może wśród Twoich znajomych są potencjalni dawcy osocza.</p>
                <p> Razem uratujemy więcej ludzkich żyć!</p>
        </div>
    );
}