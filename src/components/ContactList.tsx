import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Room, Email} from '@material-ui/icons';
import Phone from '@material-ui/icons/Phone';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    constactList: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    constactListElement:{
      paddingTop: 2
    }
   }),
);

export default function ContactList() {
  const classes = useStyles();

  return (
    <List className={classes.constactList}>     
     <ListItem button className={classes.constactListElement}>         
        <ListItemIcon>
          <Room />
        </ListItemIcon>  
      <ListItemText primary="ul. Rzeźnicza 11" secondary="31-540 Kraków" />
      </ListItem>
      <ListItem button className={classes.constactListElement}>         
        <ListItemIcon>
          <Phone />
        </ListItemIcon>  
      <ListItemText primary="999 999 999" secondary="w godz. 8:00-16:00" />
      </ListItem>
      <ListItem button className={classes.constactListElement}>         
        <ListItemIcon>
          <Phone />
        </ListItemIcon>  
      <ListItemText primary="333 333 333" secondary="w godz. 7:00-15:00" />
      </ListItem>
      <ListItem button className={classes.constactListElement}>         
        <ListItemIcon>
          <Email />
        </ListItemIcon>  
      <ListItemText primary="osocze@rckik.pl" secondary="w emailu podaj nr telefonu do kontaktu" />
      </ListItem>
    </List>
  );
}
