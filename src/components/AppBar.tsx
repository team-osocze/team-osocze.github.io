import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, SvgIcon, Typography } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { Link, LinkProps } from 'react-router-dom';
import GitHubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
        drawerHeader: {
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 0 0 10px",
            boxSizing: "border-box"
        }
    }),
);

interface ListItemLinkProps {
    icon?: React.ReactElement;
    primary: string;
    to: string;
    onClick: () => void;
}

function ListItemLink(props: ListItemLinkProps) {
    const { primary, to, icon } = props;

    const renderLink = React.useMemo(
        () =>
            React.forwardRef<any, Omit<LinkProps, 'to'>>((itemProps, ref) => (
                <Link to={to} ref={ref} {...itemProps} />
            )),
        [to],
    );

    return (
        <li onClick={props.onClick}>
            <ListItem button component={renderLink}>
                {icon && <ListItemIcon>{icon}</ListItemIcon>}
                <ListItemText primary={primary} />
            </ListItem>
        </li>
    );
}

interface AppBarProps {
    showResultOption: boolean;
}

export default function ButtonAppBar({showResultOption}: AppBarProps) {
    const classes = useStyles();
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawerOpen = () => {
        setDrawerOpen(x => !x);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawerOpen}>
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                open={drawerOpen}
                variant="persistent"
                anchor="left"
            >
                <div className={classes.drawerHeader} onClick={toggleDrawerOpen}>
                    <Typography>Osocze ma moc!</Typography>
                    <IconButton>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>

                    <ListItemLink primary="O projekcie" to="" onClick={toggleDrawerOpen} />
                    <ListItemLink primary="Test" to="test" onClick={toggleDrawerOpen}/>
                    {showResultOption && <ListItemLink primary="Wynik" to="result" onClick={toggleDrawerOpen}/>}
                    <ListItemLink primary="FAQ - Najczęściej zadawane pytania" to="faq" onClick={toggleDrawerOpen}/>
                    <Divider />
                    <ListItem button component="a" href="https://github.com/team-osocze/team-osocze.github.io" target="_blank">
                        <ListItemIcon><GitHubIcon style={{color: "black"}}/></ListItemIcon>
                        <ListItemText primary="Kod źródłowy"/>
                    </ListItem>
                    <ListItem button component="a" href="https://www.mediusflow.com/" target="_blank">
                        <ListItemIcon>
                            <SvgIcon>
                            <circle cx="11.9" cy="12.1" r="5.2" fill="red" />
                            <path d="M11.9,23.6c-6.4,0-11.6-5.2-11.6-11.6S5.6,0.5,11.9,0.5s11.6,5.2,11.6,11.6S18.3,23.6,11.9,23.6z M11.9,2.9&#xD;&#xA;	c-5.1,0-9.2,4.1-9.2,9.2c0,5.1,4.1,9.2,9.2,9.2c5.1,0,9.2-4.1,9.2-9.2C21.1,7,17,2.9,11.9,2.9z" fill="black"/>
                            </SvgIcon>
                        </ListItemIcon>
                        <ListItemText primary="Twórcy"/>
                    </ListItem>
                    <Divider />
                    <ListItem button component="a" href="https://rckik.krakow.pl/" target="_blank">
                        <ListItemIcon>
                            <SvgIcon>                            
                            <g id="surface1">
                            <path fill="red" d="M 10.054688 0.707031 C 9.84375 0.875 9.808594 1.035156 9.839844 1.667969 C 9.890625 2.664062 9.746094 3.535156 9.378906 4.472656 C 9.171875 5 8.90625 5.503906 8.238281 6.613281 C 7.683594 7.53125 7.46875 7.960938 7.285156 8.492188 C 7.050781 9.15625 7 9.554688 7.019531 10.492188 C 7.039062 11.222656 7.054688 11.363281 7.160156 11.71875 C 7.40625 12.550781 7.785156 13.1875 8.382812 13.78125 C 8.972656 14.363281 9.511719 14.683594 10.324219 14.941406 C 10.695312 15.058594 10.765625 15.0625 11.570312 15.0625 C 12.375 15.0625 12.445312 15.058594 12.816406 14.941406 C 13.628906 14.683594 14.167969 14.363281 14.757812 13.78125 C 15.359375 13.1875 15.738281 12.550781 15.980469 11.71875 C 16.078125 11.371094 16.097656 11.214844 16.113281 10.558594 C 16.140625 9.621094 16.050781 8.988281 15.753906 8.089844 C 15.144531 6.226562 14.074219 4.570312 11.675781 1.785156 C 10.707031 0.660156 10.667969 0.625 10.375 0.625 C 10.226562 0.625 10.113281 0.652344 10.054688 0.707031 Z M 12.371094 6.820312 C 12.429688 6.886719 12.441406 7.058594 12.457031 7.882812 C 12.464844 8.636719 12.480469 8.886719 12.53125 8.941406 C 12.582031 9.007812 12.710938 9.019531 13.570312 9.019531 C 14.398438 9.019531 14.554688 9.027344 14.613281 9.089844 C 14.667969 9.148438 14.683594 9.289062 14.683594 9.957031 C 14.683594 10.699219 14.675781 10.757812 14.597656 10.804688 C 14.546875 10.832031 14.128906 10.847656 13.550781 10.847656 C 12.710938 10.847656 12.582031 10.855469 12.53125 10.925781 C 12.480469 10.976562 12.464844 11.226562 12.457031 12.003906 C 12.445312 12.878906 12.433594 13.023438 12.371094 13.066406 C 12.265625 13.148438 10.875 13.148438 10.769531 13.070312 C 10.707031 13.023438 10.695312 12.878906 10.683594 12.003906 C 10.675781 11.226562 10.660156 10.976562 10.609375 10.925781 C 10.558594 10.855469 10.429688 10.847656 9.589844 10.847656 C 9.011719 10.847656 8.59375 10.832031 8.542969 10.804688 C 8.460938 10.757812 8.457031 10.699219 8.457031 9.957031 C 8.457031 9.289062 8.472656 9.148438 8.527344 9.089844 C 8.585938 9.027344 8.742188 9.019531 9.570312 9.019531 C 10.429688 9.019531 10.558594 9.007812 10.609375 8.941406 C 10.660156 8.886719 10.675781 8.636719 10.683594 7.882812 C 10.699219 7.058594 10.710938 6.886719 10.769531 6.820312 C 10.828125 6.75 10.925781 6.742188 11.570312 6.742188 C 12.214844 6.742188 12.3125 6.75 12.371094 6.820312 Z M 12.371094 6.820312 "/>
                            </g>                           
                            </SvgIcon>
                        </ListItemIcon>
                        <ListItemText primary="Patronat RCKiK"/>
                    </ListItem>
                </List>
            </Drawer>
        </div>
    );
}