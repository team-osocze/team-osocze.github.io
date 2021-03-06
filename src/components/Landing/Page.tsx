import Button from "@material-ui/core/Button";
import * as React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import logo from "../../logoRCKiK.png";

const useStyles = makeStyles({
    header: {
        marginTop: "16px",
        marginBottom: "8px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      },
    content: {
        padding: "0 16px",
        flex: 1
    },
    logoSection: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        margin: "10px 0",
        "& img": {
            marginRight: 10
        }
    },
    logoImg: {
        width: "100%"
    },
    testStartSection: {
        width: "100%",
        marginTop: "10px",
        marginBottom: "10px",
        padding: "5px",
        display: "flex",
        justifyContent: "center"
    }
});

export function LandingPage() {
    const classes = useStyles();

    return (
        <>
            <div className={classes.content}>
                <header className={classes.header}>
                    <Typography variant="h4">Ozdrowieńcu!</Typography>
                </header>
                <section>                    
                    <Typography component="article" variant="body2" style={{ marginBottom: "10px" }}>
                        Chorowałeś na COVID-19 i jesteś już zdrowy?  Wspaniale, teraz możesz uratować komuś życie!
                        <strong> Na tej stronie dowiesz się czy możesz zostać dawcą osocza.</strong>
                    </Typography>
                    <Typography component="article" variant="body2" style={{ marginBottom: "10px" }}>
                        Wiemy jak trudno jest uzyskać konkretną informację na temat możliwości oddania osocza przez ozdrowieńców. Żeby odciążyć centra krwiodawstwa i krwiolecznictwa
                        na etapie wstępnych wywiadów, stworzyliśmy projekt osocze.info. W ciągu kilku minut dowiesz się, czy możesz być dawcą osocza, które wspomaga leczenie chorych na COVID-19.
                    </Typography>
                    <Typography component="article" variant="body2">
                        Pytania w ankiecie odpowiadają tym, które zadałaby Ci przez telefon osoba z RCKiK. Odpowiedzi nie są zbierane na tym etapie
                        i są całkowicie anonimowe. To narzędzie ma służyć wyłącznie sprawdzeniu czy nie ma przeciwskazań, abyś został dawcą osocza.
                    </Typography>
                </section>
                <section className={classes.testStartSection}>
                    <Button component={Link} to="test" size="large" variant="contained" color="primary">Rozpocznij test</Button>
                </section>
                <section className={classes.logoSection}>
                    <a href="https://rckik.krakow.pl" target="blank">
                        <img src={logo} className={classes.logoImg} alt="RCKiK w Krakowie logo" />
                    </a>
                    <Typography variant="body2" style={{ width: "100%" }}>
                        Ankieta pod patronatem <strong>RCKiK</strong>.
                    </Typography>                                        
                </section>              
            </div>
        </>
    )
}