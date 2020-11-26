import React from "react";
import Typography from "@material-ui/core/Typography";
import DraftsIcon from '@material-ui/icons/Drafts';
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const applicationEmail: string = "osocze@rckik.pl";
let applicationEmailText: string =  `Zgłoszenie Ozdrowieńca, \n
Imię i Nazwisko: \n 
Numer telefonu: \n 
Dodatkowe uwagi: `;

interface IResultProps {
    subject: string;
    resultMessages: string[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    emailLink: {
        display: 'inline'
    },
    buttonLink:{
        marginBottom: '5px'
    }
  })
);

export default function Mailto({subject, resultMessages }: IResultProps){
    const classes = useStyles();

    let params = subject || applicationEmailText ? '?' : '';
    if (subject) params += `subject=${encodeURIComponent(subject)}`;
    if (resultMessages) applicationEmailText += resultMessages.join(' \n');
    if (applicationEmailText) params += `${subject ? '&' : ''}body=${encodeURIComponent(applicationEmailText)}`;
  
    return(
        <>
        <p>
        <Button variant="outlined" 
        className={classes.buttonLink}
        color="primary"
        startIcon={<DraftsIcon />}>
            <a href={`mailto:${applicationEmail}${params}`} color="primary">       
                <Typography variant="h6" gutterBottom className={classes.emailLink} color="primary"> Zgłoś się przez e-mail </Typography>
            </a>  
        </Button>      
        <Typography variant="body1" gutterBottom>
        Koniecznie podając:<br/>
        - imie i nazwisko<br/>
        - numer telefonu<br/>        
        - informację o wynikach testu<br/> 
        </Typography>
        </p>        
    </>)
  };