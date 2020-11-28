import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ContactList from "./ContactList";
import logo from "../../logoRCKiK.png";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    centerCard: {
      maxWidth: 600,
      padding: 4,
      margin: "auto",
    },
    large: {
      width: "100%",
    },
    centerCardHeader: {
      paddingBottom: 4,
      align: "right",
    },
    centerCardContent: {
      paddingTop: 4,
    },
    logoSection: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      margin: "5px 0",
      "& img": {
        marginRight: 10,
      },
    },
    logoImg: {
      width: "100%",
      maxWidth: "300px",
    },
    logoTitle: {
      padding: "16px",
    },
  })
);

export default function Contact() {
  const classes = useStyles();

  return (
    <Card className={classes.centerCard}>
      <div>
        <section className={classes.logoSection}>
          <a href="https://rckik.krakow.pl" target="blank">
            <img
              src={logo}
              className={classes.logoImg}
              alt="RCKiK w Krakowie logo"
            />
          </a>
          <Typography variant="h6" className={classes.logoTitle}>
            Regionalne Centrum Krwiodawstwa i Krwiolecznictwa w Krakowie
          </Typography>
        </section>
      </div>
      <CardContent className={classes.centerCardContent}>
        <Typography variant="body2" component="p">
          <ContactList />
        </Typography>
      </CardContent>
    </Card>
  );
}
