import React from 'react';
import SuccessResult from "./SuccessResult";
import ErrorResult from "./ErrorResult";
import WarningResult from "./WarningResult";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme: Theme) =>
createStyles({ 
        sideButton: {
            marginLeft: 32
        }
    }),
);

export default function Result() {
    const classes = useStyles();
    
    const showSuccessResult = true;
    const showErrorResult = true;
    const showWarningResult = true;

    return (
        <div> 
            <div>         
                <Typography variant="h3">Rezultat 
                    <Button size="large" variant="contained" color="primary" className={classes.sideButton}>Test
                    </Button>
                </Typography>  
            </div> 
            <div>     
                { showSuccessResult ? <SuccessResult /> : null }     
                { showErrorResult ? <ErrorResult /> : null } 
                { showWarningResult ? <WarningResult /> : null } 
            </div>
        </div>
    );
}