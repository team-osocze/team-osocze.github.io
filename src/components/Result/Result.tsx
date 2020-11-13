import React from 'react';
import SuccessResult from "./SuccessResult";
import ErrorResult from "./ErrorResult";
import WarningResult from "./WarningResult";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme: Theme) =>
createStyles({ 
    root: {
        width: "90%",
        marginLeft: "auto",
        marginRight: "auto",
      },
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
    
    const showSuccessResult = true;
    const showErrorResult = true;
    const showWarningResult = true;

    return (
        <div className={classes.root}> 
            <header className={classes.header}>
                <Typography variant="h4">Rezultat</Typography>
                <Button size="large" variant="contained" color="primary">Test </Button>
            </header>
            <div>     
                { showSuccessResult ? <SuccessResult /> : null }     
                { showErrorResult ? <ErrorResult /> : null } 
                { showWarningResult ? <WarningResult /> : null } 
            </div>
        </div>
    );
}