import React from 'react';
import SuccessResult from "./SuccessResult";
import ErrorResult from "./ErrorResult";
import WarningResult from "./WarningResult";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme: Theme) =>
createStyles({ 
    content:{
        padding: "0 16px",
        flex: 1
    }, 
    header: {
        marginTop: "16px",
        marginBottom: "8px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }   
    }),
);

export default function Result() {
    const classes = useStyles();
    
    //todo: it should depend on result oucome
    const showSuccessResult = false;
    const showErrorResult = false;
    const showWarningResult = true;

    return (
        <>
        <div className={classes.content}> 
            <header className={classes.header}>
                <Typography variant="h4" gutterBottom>Wynik</Typography>
                <Button size="large" variant="contained" color="primary">Test</Button>
            </header>
            <div>     
                { showSuccessResult ? <SuccessResult /> : null }     
                { showErrorResult ? <ErrorResult /> : null } 
                { showWarningResult ? <WarningResult /> : null } 
            </div>
        </div>
        </>
    );
}