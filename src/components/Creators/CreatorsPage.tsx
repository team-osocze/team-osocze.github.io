import * as React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from "@material-ui/core";
import logo from "../../medius.jpg";
import {appInsights} from "../../AppInsights";
import { useEffect } from "react";

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
    logoImg: {
        width: "60%"
    },
    testStartSection: {
        width: "100%",
        marginTop: "10px",
        marginBottom: "10px",
        padding: "5px",
        display: "flex",
        justifyContent: "center",
        textAlign: "center"
    }
});

export function CreatorsPage() {
    const classes = useStyles();

    useEffect(() => {
        appInsights.trackEvent({name: "AuthorsEvent"});
    }, []);
    
    return (
        <>
            <div className={classes.content}>
                <header className={classes.header}>
                    <Typography variant="h4">Kim jesteśmy?</Typography>
                </header>
                <section>
                    <Typography component="article" variant="body2" style={{ marginBottom: "10px" }}>
                    Jesteśmy grupą znajomych, których łączą co najmniej trzy rzeczy:
                    <br /> • chęć niesienia pomocy,
                    <br /> • wspólna praca i pasja jaką jest tworzenie oprogramowania,
                    <br /> • miłość do kawy w dobrym towarzystwie.
                    </Typography>
                    <Typography component="article" variant="body2" style={{ marginBottom: "10px" }}>
                    Postanowiliśmy dobrze wykorzystać to w czym jesteśmy najlepsi.
                    Zebraliśmy wymagania, zaprojektowaliśmy i wykonaliśmy aplikację, przetestowaliśmy jej działanie oraz zweryfikowaliśmy poprawność pod czujnym okiem specjalistów z <strong>RCKiK</strong> w Krakowie.
                    Wykorzystaliśmy swój wolny czas, aby nie tracili go Ci którzy potrafią i mogą ratować ludzkie życie.
                    </Typography>
                </section>
                <section>
                    <Typography variant="body2" style={{ marginBottom: "30px" }}>
                    Mamy nadzieję, że podobają Ci się efekty naszej pracy. Jeśli jesteś ciekaw czym zajmujemy się na codzień, zapraszamy na naszą stronę internetową:
                    </Typography>
                </section>
                <section className={classes.testStartSection}>
                    <a href="https://www.mediusflow.com/en/about/career/career-welcome" target="blank">
                        <img src={logo} className={classes.logoImg} alt="Medius logo" />
                    </a>
                </section>
            </div>
        </>
    )
}