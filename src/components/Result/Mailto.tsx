import React from "react";
import Typography from "@material-ui/core/Typography";
import DraftsIcon from '@material-ui/icons/Drafts';
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { format } from 'react-string-format';

const applicationEmail: string = "gutosia@gmail.com";
let applicationEmailText: string = "";
let applicationEmailBody: string = `Zgłoszenie Ozdrowieńca, \n
Imię i Nazwisko: \n
Numer telefonu: \n
Kontakt z COVID-19: {0} \n
Dodatkowe uwagi: {1} \n`;

interface IResultProps {
    subject: string;
    resultMessages: string[];
    resultSuccessMessages: string[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    emailLink: {
        display: 'inline'
    },
    buttonLink:{
        marginBottom: '5px'
    },
    hrefLink: {
        "text-decoration": "none"
    }
  })
);

export default function Mailto({subject, resultMessages, resultSuccessMessages }: IResultProps){
    const classes = useStyles();

    let params = subject || applicationEmailText ? '?' : '';
    if (subject) params += `subject=${encodeURIComponent(subject)}`;
    applicationEmailText = format(applicationEmailBody, resultSuccessMessages.join(' \n'), resultMessages.join(' \n'));
    if (applicationEmailText) params += `${subject ? '&' : ''}body=${encodeURIComponent(applicationEmailText)}`;
  
    return(
        <>
        <p>
        <Button variant="outlined" 
        className={classes.buttonLink}
        color="primary"
        startIcon={<DraftsIcon />}>
            <a className={classes.hrefLink} href={`mailto:${applicationEmail}${params}`} color="primary">       
                <Typography variant="h6" gutterBottom className={classes.emailLink} color="primary"> Zgłoś się przez e-mail </Typography>
            </a>  
        </Button>                      
        </p>        
    </>)
  };