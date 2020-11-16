import Button from "@material-ui/core/Button";
import * as React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";

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
        margin: "5px 0",
        "& img": {
            marginRight: 10
        }
    },
    testStartSection: {
        marginTop: "10px",
        padding: "5px",
        display: "flex",
        justifyContent: "center"
    },
    logoImg: {
        width: "100%"
    }
});

export function LandingPage() {
    const classes = useStyles();

    return (
        <>
            <div className={classes.content}>
                <header className={classes.header}>
                    <Typography variant="h4">Ozdrowieńcu!</Typography>
                    <Button component={Link} to="test" size="large" variant="contained" color="primary">Test</Button>
                </header>
                <section>                    
                    <Typography>
                        Chorowałeś na COVID-19 i jesteś już zdrowy? Wspaniale! Teraz możesz uratować komyś życie!
                    </Typography>
                </section>
                <section className={classes.logoSection}>
                    <a href="https://rckik.krakow.pl" target="blank">
                        <img src="logoRCKiK1.png" className={classes.logoImg} alt="RCKiK w Krakowie logo" />
                    </a>
                    <Typography>
                        Ankieta pod patronatem <strong>RCKiK</strong> dane są w pełni anonimowe, pozostają tylko u Ciebie na komputerze, nikt ich nie zbiera i nie przetważa
                    </Typography>
                </section>
                <section>
                    <Typography component="article" variant="body2" style={{ marginBottom: "10px" }}>
                        Wiemy jak trudno jest uzyskać konkretną informację na temat możliwości oddania osocza przez ozdrowieńców. Dlatego, żeby odciążyć centra krwiodastwa
                        na etapie wstępnych wywiadów, stworzyliśmy projekt osocze.info. W ciągu kilku minut dowiesz się czy Twoje osocze może pomóc leczyć chorych na koronawirusa.
                    </Typography>
                    <Typography component="article" variant="body2">
                        Pytania w ankiecie odpowiadają tym, które zadałaby Ci przez telefon osoba z punktu krwiodastwa. Odpowiedzi nie są zbierane na tym etapie
                        i są całkowicie anonimowe. To narzędzie ma służyć wyłacznie sprawdzeniu czy jest sens próbować dodzwonić się do punktu odbiory osocza.
                    </Typography>
                </section>
                <section className={classes.testStartSection}>
                    <Button component={Link} to="test" size="large" variant="contained" color="primary">Rozpocznij test</Button>
                </section>
            </div>
        </>
    )
}