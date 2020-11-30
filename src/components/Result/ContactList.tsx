import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Room, Email, Language } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    constactList: {
      width: "100%",
      backgroundColor: theme.palette.background.paper,
    },
    constactListElement: {
      paddingTop: 0,
      paddingBottom: 0,
    },
    listItemSubText:{
      fontSize: '1.0em',
      color: 'black',
      fontWeight: 800
    }
  })
);

export default function ContactList() {
  const classes = useStyles();

  return (
    <List className={classes.constactList}>
      <ListItem
        button
        component="a"
        href="https://www.google.com/maps/search/?api=1&query=Regionalne+Centrum+Krwiodawstwa+i+Krwiolecznictwa+w+Krakowie"
        target="_blank"
        className={classes.constactListElement}
      >
        <ListItemIcon>
          <Room />
        </ListItemIcon>
        <ListItemText primary="ul. Rzeźnicza 11" secondary="31-540 Kraków" />
      </ListItem>
      {/*<ListItem button component="a" href="tel:+48 661 926 116" className={classes.constactListElement}>         
      <ListItemIcon>
          <Phone />
        </ListItemIcon>  
      <ListItemText primary="+48 661 926 116" secondary="w godz. 8:00-15:00" />
      </ListItem> */}
      <ListItem
        button
        component="a"
        href="https://rckik.krakow.pl"
        target="_blank"
        className={classes.constactListElement}
      >
        <ListItemIcon>
          <Language />
        </ListItemIcon>
        <ListItemText primary="rckik.krakow.pl" secondary="" />
      </ListItem>
      <ListItem
        button
        component="a"
        href="mailto:osocze@rckik.pl"
        className={classes.constactListElement}
      >
        <ListItemIcon>
          <Email />
        </ListItemIcon>
        <ListItemText classes={{secondary:classes.listItemSubText}}
          primary="dzial.dawcow@rckik.krakow.pl"
          secondary="w e-mailu podaj numer telefonu do kontaktu oraz wynik testu"
        />
      </ListItem>
    </List>
  );
}
