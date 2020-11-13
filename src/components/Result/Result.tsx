import React from 'react';
import SuccessResult from "./SuccessResult";
import ErrorResult from "./ErrorResult";
import WarningResult from "./WarningResult";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme: Theme) =>
createStyles({     
      header: {
        marginTop: "30px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }     
    }),
);

export default function Result() {
    const classes = useStyles();
    
    const showSuccessResult = false;
    const showErrorResult = false;
    const showWarningResult = true;

    return (
        <div> 
            <header className={classes.header}>
                <Typography variant="h4" gutterBottom>Rezultat</Typography>
                <Button size="large" variant="contained" color="primary">Test</Button>
            </header>
            <div>     
                { showSuccessResult ? <SuccessResult /> : null }     
                { showErrorResult ? <ErrorResult /> : null } 
                { showWarningResult ? <WarningResult /> : null } 
            </div>
        </div>
    );
}